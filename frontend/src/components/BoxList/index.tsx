import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import BoxListItem from './partials/BoxListItem';

import { Container, EmptyMessage, List } from './styles';

interface BoxListParams {
  items: Array<{ id: string; title: string; iconUrl?: string }>;
  loadItems?: (page: number) => Promise<Array<unknown>>;
  onAdd?: () => void;
  onDelete?: (data: any) => void;
  title: string;
}

const BoxList: React.FC<BoxListParams> = ({
  items,
  onAdd,
  onDelete,
  title,
  loadItems,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [reachedLastPage, setReachedLastPage] = useState(false);

  const ref = useRef() as MutableRefObject<HTMLUListElement>;

  async function load() {
    if (loadItems && !reachedLastPage) {
      const loadedItems = await loadItems(currentPage);
      setCurrentPage(currentPage + 1);

      if (loadedItems.length === 0) {
        setReachedLastPage(true);
      }
    }
  }

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    async function loadItemsWhenScrollReachMaxScroll() {
      if (!ref.current) return;

      const { scrollHeight, offsetHeight, scrollTop } = ref.current;
      const scrolledToMaxScrollTop = scrollHeight - offsetHeight === scrollTop;

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

      <List ref={ref}>
        {items.length > 0 ? (
          items.map((item) => (
            <BoxListItem
              key={item.id}
              title={item.title}
              iconUrl={item.iconUrl}
              onDelete={onDelete}
              data={item}
            />
          ))
        ) : (
          <EmptyMessage>
            😕
            <p>It&apos;s empty</p>
          </EmptyMessage>
        )}
      </List>
    </Container>
  );
};

export default BoxList;
