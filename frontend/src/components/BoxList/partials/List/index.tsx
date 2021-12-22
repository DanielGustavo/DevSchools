import React, { MutableRefObject, useRef, useState, useEffect } from 'react';

import BoxListItem from '../BoxListItem';

import { Container, EmptyMessage, LoadingIcon } from './styles';

interface ListParams {
  items: Array<{
    id: string;
    iconUrl?: string;
    [key: string]: any;
  }>;
  itemTitleProperty?: string;
  url?: string;
  onDelete?: (data: any) => void;
  loadItems?: (page: number) => Promise<Array<unknown>>;
}

const List: React.FC<ListParams> = ({
  items,
  onDelete,
  itemTitleProperty = 'title',
  loadItems,
  url,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [reachedLastPage, setReachedLastPage] = useState(false);

  const ref = useRef() as MutableRefObject<HTMLUListElement>;

  async function load() {
    if (loadItems && !reachedLastPage && !loading) {
      setLoading(true);

      const loadedItems = await loadItems(currentPage);
      setCurrentPage(currentPage + 1);

      if (loadedItems.length === 0) {
        setReachedLastPage(true);
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    async function loadItemsWhenScrollReachMaxScroll() {
      if (!ref.current) return;

      const { scrollHeight, offsetHeight, scrollTop } = ref.current;
      const scrolledToMaxScrollTop =
        scrollHeight - offsetHeight - 5 <= scrollTop;

      if (scrolledToMaxScrollTop) {
        load();
      }
    }

    if (loadItems !== undefined) {
      ref.current?.addEventListener(
        'scroll',
        loadItemsWhenScrollReachMaxScroll
      );
    }

    return () => {
      ref.current?.removeEventListener(
        'scroll',
        loadItemsWhenScrollReachMaxScroll
      );
    };
  }, [ref, load, loadItems]);

  return (
    <Container ref={ref}>
      {items.length === 0 && !loading ? (
        <EmptyMessage>
          😕
          <p>It&apos;s empty</p>
        </EmptyMessage>
      ) : (
        items.map((item) => (
          <BoxListItem
            key={item.id}
            title={item[itemTitleProperty] || item.id}
            iconUrl={item.iconUrl}
            onDelete={onDelete}
            data={item}
            url={url}
          />
        ))
      )}

      {loading && <LoadingIcon type="spin" />}
    </Container>
  );
};

export default List;
