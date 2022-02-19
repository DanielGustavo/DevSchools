import React from 'react';

import ButtonLink from '../../components/ButtonLink';

import { ReactComponent as Building } from '../../assets/images/building.svg';
import { ReactComponent as Pana } from '../../assets/images/pana.svg';

import {
  Container,
  HeroSection,
  SubHeroSection,
  SecondaryButtonLink,
} from './styles';

const LandingPage: React.FC = () => (
  <Container>
    <HeroSection>
      <div>
        <h1>
          Take your school to the <span>next level!</span>
        </h1>

        <ButtonLink secondary to="/signup">
          Join us
        </ButtonLink>
        <SecondaryButtonLink outlined light to="/signin">
          Sign in
        </SecondaryButtonLink>
      </div>

      <Building />
    </HeroSection>

    <SubHeroSection>
      <h2>Connect Your School!</h2>
      <p>
        With DevSchools, you’ll be able to connect your school with it’s
        theachers and students in an easy and interactable way!
      </p>

      <Pana />
    </SubHeroSection>
  </Container>
);

export default LandingPage;
