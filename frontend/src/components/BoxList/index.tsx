import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';

import { ModalParams } from '../Modal';
import List from './partials/List';

import { Container } from './styles';

import useModal from '../../hooks/useModal';

interface Item {
  id: string;
  iconUrl?: string;
  [key: string]: any;
}

interface AddItemModalParams extends ModalParams {
  onAdd?: (item: Item | any) => void;
}

interface DeleteItemModalParams extends ModalParams {
  data?: Item | any;
  onDelete?: (item: Item | any) => void;
}

interface BoxListParams {
  loadItems?: (page: number) => Promise<Array<Item>>;
  onAdd?: () => void;
  itemTitleProperty?: string;
  title: string;
  AddItemModal?: React.FC<AddItemModalParams>;
  DeleteItemModal?: React.FC<DeleteItemModalParams>;
}

const BoxList: React.FC<BoxListParams> = ({
  title,
  itemTitleProperty,
  loadItems,
  AddItemModal,
  DeleteItemModal,
}) => {
  const [items, setItems] = useState([] as Item[]);

  const { modals, closeModal, openModal } = useModal(['addItem', 'deleteItem']);

  function addItem(item: Item) {
    setItems([...items, item]);
  }

  function deleteItem(item: Item) {
    setItems(items.filter(({ id }) => id !== item.id));
  }

  async function load(page: number) {
    if (loadItems) {
      const loadedItems = ((await loadItems(page)) ?? []) as Item[];

      setItems([...items, ...loadedItems]);

      return loadedItems;
    }

    return [];
  }

  return (
    <>
      {AddItemModal && (
        <AddItemModal
          open={modals.addItem.open}
          handleClose={() => closeModal('addItem')}
          onAdd={addItem}
        />
      )}
      {DeleteItemModal && (
        <DeleteItemModal
          open={modals.deleteItem.open}
          data={modals.deleteItem.data}
          handleClose={() => closeModal('deleteItem')}
          onDelete={deleteItem}
        />
      )}

      <Container>
        <header>
          <h2>{title}</h2>

          {AddItemModal && (
            <button type="button" onClick={() => openModal('addItem')}>
              <FiPlus />
            </button>
          )}
        </header>

        <List
          itemTitleProperty={itemTitleProperty}
          onDelete={
            DeleteItemModal
              ? (item) => openModal('deleteItem', item)
              : undefined
          }
          items={items}
          loadItems={load}
        />
      </Container>
    </>
  );
};

export default BoxList;
