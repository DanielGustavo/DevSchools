import React from 'react';

import BoxListItem from '../BoxListItem';

import { Container, EmptyMessage, LoadingIcon } from './styles';

interface ListParams {
  items: Array<{ id: string; title: string; iconUrl?: string }>;
  loading: boolean;
  onDelete?: (data: any) => void;
}

const List: React.ForwardRefRenderFunction<HTMLUListElement, ListParams> = (
  { items, onDelete, loading },
  ref
) => (
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
          title={item.title}
          iconUrl={item.iconUrl}
          onDelete={onDelete}
          data={item}
        />
      ))
    )}

    {loading && <LoadingIcon type="spin" />}
  </Container>
);

export default React.forwardRef(List);
