import styled, { keyframes } from 'styled-components';
import { FiChevronDown, FiAlignJustify } from 'react-icons/fi';

interface ArrowDownIconProps {
  selected: boolean;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

export const HamburguerIcon = styled(FiAlignJustify)`
  color: var(--light-color) !important;

  @media (min-width: 426px) {
    display: none;
  }
`;

export const ArrowDownIcon = styled(FiChevronDown)<ArrowDownIconProps>`
  transition: 0.2s;

  transform: ${({ selected }) =>
    selected ? 'rotate(180deg)' : 'rotate(0deg)'};
`;

export const Container = styled.div`
  display: flex;
  position: relative;

  button {
    background: none;
    border: none;
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 3px;

    svg {
      width: 100%;
      height: 100%;
      color: var(--gray-color);
    }

    @media (max-width: 425px) {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;

    strong {
      font-size: 0.6rem;
      font-weight: 500;
    }

    small {
      font-size: 0.5rem;
      color: var(--gray-color);
    }
  }

  @media (max-width: 425px) {
    display: none;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 0.5rem;

  background: var(--gray-color);
  color: var(--light-color);
  font-size: 0.7rem;

  img {
    width: 100%;
    height: 100%;
    border-radius: 15%;
  }

  width: 1.8rem;
  height: 1.8rem;
  border-radius: 15%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuBox = styled.ul`
  position: absolute;
  right: 0;
  top: 2rem;

  animation: ${fadeIn} 0.2s ease;
  background: var(--light-color);
  border: 2px solid var(--gray-color);
  padding: 0.2rem;
  width: 10rem;

  border-radius: 6px;
  list-style: none;

  li,
  li button {
    cursor: pointer;
    color: var(--gray-color);
    border-radius: 5px;
    width: 100%;
    text-align: left;
    font-size: 0.7rem;
  }

  li button {
    background: none;
  }

  li {
    padding: 5px;

    &:hover {
      background: var(--gray-light-color);
      color: var(--dark-color);

      > button {
        color: var(--dark-color);
      }
    }

    &:active {
      background: var(--gray-color);
      color: var(--dark-color);

      > button {
        color: var(--dark-color);
      }
    }
  }
`;
