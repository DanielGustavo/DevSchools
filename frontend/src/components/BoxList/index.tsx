import React from 'react';
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
}) => (
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
      itemTitleProperty={itemTitleProperty}
      onDelete={onDelete}
      items={items}
      loadItems={loadItems}
    />
  </Container>
);

export default BoxList;
