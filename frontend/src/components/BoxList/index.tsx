import React, { MutableRefObject, useEffect, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';

import BoxListItem from './partials/BoxListItem';

import { Container, List } from './styles';

interface BoxListParams {
  items: Array<{ id: string; title: string; iconUrl?: string }>;
  onMaxScroll?: () => void;
  onAdd?: () => void;
  onDelete?: (data: any) => void;
  title: string;
}

const BoxList: React.FC<BoxListParams> = ({
  items,
  onMaxScroll,
  onAdd,
  onDelete,
  title,
}) => {
  const ref = useRef() as MutableRefObject<HTMLUListElement>;

  useEffect(() => {
    function notifyWhenScrollReachMaxScroll() {
      if (!onMaxScroll || !ref.current) return;

      const { scrollHeight, offsetHeight, scrollTop } = ref.current;
      const scrolledToMaxScrollTop = scrollHeight - offsetHeight === scrollTop;

      if (scrolledToMaxScrollTop) {
        onMaxScroll();
      }
    }

    ref.current?.addEventListener('scroll', notifyWhenScrollReachMaxScroll);

    return () => {
      ref.current?.removeEventListener(
        'scroll',
        notifyWhenScrollReachMaxScroll
      );
    };
  }, [onMaxScroll, ref]);

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
        {items.map((item) => (
          <BoxListItem
            key={item.id}
            title={item.title}
            iconUrl={item.iconUrl}
            onDelete={onDelete}
            data={item}
          />
        ))}
      </List>
    </Container>
  );
};

export default BoxList;
