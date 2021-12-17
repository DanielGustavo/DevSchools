import React from 'react';

import BoxListItem from '../BoxListItem';

import { Container, EmptyMessage, LoadingIcon } from './styles';

interface ListParams {
  items: Array<{
    id: string;
    iconUrl?: string;
    [key: string]: any;
  }>;
  loading: boolean;
  itemTitleProperty?: string;
  onDelete?: (data: any) => void;
}

const List: React.ForwardRefRenderFunction<HTMLUListElement, ListParams> = (
  { items, onDelete, loading, itemTitleProperty = 'title' },
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
          title={item[itemTitleProperty] || item.id}
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
