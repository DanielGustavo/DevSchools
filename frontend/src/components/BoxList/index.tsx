import React, { MutableRefObject, useEffect, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';

import BoxListItem from './partials/BoxListItem';

import { Container, List } from './styles';

interface BoxListParams {
  ableToAdd?: boolean;
  ableToDelete?: boolean;
  items: Array<{ id: string; title: string; iconUrl?: string }>;
  onMaxScroll?: () => void;
}

const BoxList: React.FC<BoxListParams> = ({
  ableToAdd = false,
  ableToDelete = false,
  items,
  onMaxScroll,
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
        <h2>Classrooms</h2>

        {ableToAdd && <FiPlus />}
      </header>

      <List ref={ref}>
        {items.map((item) => (
          <BoxListItem
            key={item.id}
            title={item.title}
            iconUrl={item.iconUrl}
            ableToDelete={ableToDelete}
          />
        ))}
      </List>
    </Container>
  );
};

export default BoxList;
