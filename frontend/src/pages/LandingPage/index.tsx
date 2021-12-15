import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../../components/Button';

import { ReactComponent as Building } from '../../assets/images/building.svg';
import { ReactComponent as Pana } from '../../assets/images/pana.svg';

import {
  Container,
  HeroSection,
  SubHeroSection,
  SecondaryButton,
} from './styles';

const LandingPage: React.FC = () => {
  const { push } = useHistory();

  return (
    <Container>
      <HeroSection>
        <div>
          <h1>
            Take your school to the <span>next level!</span>
          </h1>

          <Button secondary onClick={() => push('/signup')}>
            Join us
          </Button>
          <SecondaryButton outlined light onClick={() => push('/signin')}>
            Sign in
          </SecondaryButton>
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
};

export default LandingPage;
