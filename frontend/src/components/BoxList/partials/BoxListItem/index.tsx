import React, { useEffect, useState } from 'react';
import { FiXCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { Container, IconWrapper } from './styles';

interface BoxListItemParams {
  data?: {
    [key: string]: any;
  };
  title: string;
  iconUrl?: string;
  url?: string;
  onDelete?: (data: any) => void;
}

const BoxListItem: React.FC<BoxListItemParams> = ({
  title,
  onDelete,
  iconUrl,
  url = '',
  data,
}) => {
  const [link, setLink] = useState('/');

  useEffect(() => {
    const urlParamKeys = url.match(/\[[a-z|0-9]+\]/gi) ?? [];

    const urlWithValues = urlParamKeys.reduce((urlWithKeys, key) => {
      const paramKey = key.replace('[', '').replace(']', '');
      const paramValue = data ? data[paramKey] : '';

      return urlWithKeys.replace(key, paramValue);
    }, url);

    setLink(urlWithValues);
  }, [url, data]);

  return (
    <Container>
      <Link to={link}>
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
      </Link>

      {onDelete && (
        <button type="button" onClick={() => onDelete(data)}>
          <FiXCircle />
        </button>
      )}
    </Container>
  );
};

export default BoxListItem;
