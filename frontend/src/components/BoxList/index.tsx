import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import List from './partials/List';

import { Container } from './styles';

interface BoxListParams {
  items: Array<{
    id: string;
    iconUrl?: string;
    [key: string]: any;
  }>;
  loadItems?: (page: number) => Promise<Array<unknown>>;
  onAdd?: () => void;
  onDelete?: (data: any) => void;
  itemTitleProperty?: string;
  title: string;
}

const BoxList: React.FC<BoxListParams> = ({
  items,
  onAdd,
  onDelete,
  title,
  itemTitleProperty,
  loadItems,
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
    <Container>
      <header>
        <h2>{title}</h2>

        {onAdd && (
          <button type="button" onClick={onAdd}>
            <FiPlus />
          </button>
        )}
      </header>

      <List
        ref={ref}
        itemTitleProperty={itemTitleProperty}
        loading={loading}
        onDelete={onDelete}
        items={items}
      />
    </Container>
  );
};

export default BoxList;
