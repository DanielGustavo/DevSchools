import React from 'react';
import { FiXCircle } from 'react-icons/fi';

import { Container, IconWrapper } from './styles';

interface BoxListItemParams {
  title: string;
  iconUrl?: string;
  ableToDelete?: boolean;
}

const BoxListItem: React.FC<BoxListItemParams> = ({
  title,
  ableToDelete,
  iconUrl,
}) => (
  <Container>
    <div>
      <IconWrapper>
        {iconUrl ? (
          <img src={iconUrl} alt={title} />
        ) : (
          title.slice(0, 2).toUpperCase()
        )}
      </IconWrapper>

      {title}
    </div>

    {ableToDelete && <FiXCircle />}
  </Container>
);

export default BoxListItem;
