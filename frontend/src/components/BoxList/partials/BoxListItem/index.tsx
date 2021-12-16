import React from 'react';
import { FiXCircle } from 'react-icons/fi';

import { Container, IconWrapper } from './styles';

interface BoxListItemParams {
  data: unknown;
  title: string;
  iconUrl?: string;
  onDelete?: (data: any) => void;
}

const BoxListItem: React.FC<BoxListItemParams> = ({
  title,
  onDelete,
  iconUrl,
  data,
}) => (
  <Container>
    <span>
      <IconWrapper>
        {iconUrl ? (
          <img src={iconUrl} alt={title} />
        ) : (
          title.slice(0, 2).toUpperCase()
        )}
      </IconWrapper>

      {title}
    </span>

    {onDelete && (
      <button type="button" onClick={() => onDelete(data)}>
        <FiXCircle />
      </button>
    )}
  </Container>
);

export default BoxListItem;
