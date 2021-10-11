import React from 'react';
import { useHistory } from 'react-router-dom';

import { ReactComponent as Building } from '../../assets/images/building.svg';
import { ReactComponent as Pana } from '../../assets/images/pana.svg';

import { Container, HeroSection, SubHeroSection } from './styles';
import { Button, OutlinedButton } from '../../styles';

const LandingPage: React.FC = () => {
  const { push } = useHistory();

  return (
    <Container>
      <HeroSection>
        <div>
          <h1>
            Take your school to the <span>next level!</span>
          </h1>

          <Button onClick={() => push('/signup')}>Join us</Button>
          <OutlinedButton onClick={() => push('/signin')}>
            Sign in
          </OutlinedButton>
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
};

export default LandingPage;
