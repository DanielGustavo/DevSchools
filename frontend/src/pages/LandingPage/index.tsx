import React from 'react';

import { ReactComponent as Building } from '../../assets/images/building.svg';
import { ReactComponent as Pana } from '../../assets/images/pana.svg';

import { Container, HeroSection, SubHeroSection } from './styles';
import { Button, OutlinedButton } from '../../styles';

const LandingPage: React.FC = () => (
  <Container>
    <HeroSection>
      <div>
        <h1>
          Take your school to the <span>next level!</span>
        </h1>

        <Button>Join us</Button>
        <OutlinedButton>Sign in</OutlinedButton>
      </div>

      <Building />
    </HeroSection>

    <SubHeroSection>
      <h1>Connect Your School!</h1>
      <h2>
        With DevSchools, you’ll be able to connect your school with it’s
        theachers and students in an easy and interactable way!
      </h2>

      <Pana />
    </SubHeroSection>
  </Container>
);

export default LandingPage;
