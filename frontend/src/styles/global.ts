import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    --primary-color: #2CCED9;
    --primary-color-dark: #1F9199;
    --primary-transparent-color-dark: #1F919955;
    --primary-color-light: #53E6F1;

    --secondary-color: #7F53DD;
    --secondary-color-dark: #5B3C9E;
    --secondary-transparent-color-dark: #5B3C9E55;
    --secondary-color-light: #A47AFF;

    --gray-color: #757575;
    --gray-transparent-color: #75757555;
    --dark-color: #404040;
    --dark-transparent-color: #404040bb;
    --light-color: #FFFFFF;
    --gray-light-color: #C5C5C5;

    --danger-color: #D95241;
    --danger-color-dark: #993A2E;
    --danger-color-light: #FF7866;

    --success-color: #22E685;
    --success-color-dark: #19A65F;
    --success-color-light: #40FF9F;

    --alert-color: #D9BE16;
    --alert-color-dark: #99870F;
    --alert-color-light: #FFE433;
  }

  * {
    outline-color: var(--primary-color);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    @media (max-width: 356px) {
      font-size: 15px;
    }

    @media (max-width: 768px) and (min-width: 356px) {
      font-size: 18px;
    }

    @media (max-width: 1440px) and (min-width: 768px) {
      font-size: 25px;
    }

    @media (min-width: 1440px) {
      font-size: 31px;
    }
  }

  body {
    color: var(--dark-color);
    background: var(--light-color);
    -webkit-font-smoothing: antialiased;
  }

  body, button, input {
    font-family: 'Asap', Arial, Helvetica, sans-serif;
  }

  button {
    cursor: pointer;
  }

  h1 {
    font-size: 2.5rem
  }

  h2 {
    font-size: 1rem;
  }

  small {
    font-size: 0.6rem;
  }
`;
