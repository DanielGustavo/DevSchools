import React from 'react';
import { FiPlus } from 'react-icons/fi';

import BoxListItem from './partials/BoxListItem';

import { Container, List } from './styles';

interface BoxListParams {
  ableToAdd?: boolean;
  ableToDelete?: boolean;
  items: Array<{ id: string; title: string; iconUrl?: string }>;
}

const BoxList: React.ForwardRefRenderFunction<HTMLUListElement, BoxListParams> =
  ({ ableToAdd = false, ableToDelete = false, items }, ref) => (
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

export default React.forwardRef(BoxList);
