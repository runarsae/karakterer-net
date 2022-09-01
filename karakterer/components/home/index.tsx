import Section from 'components/common/Section';
import Header from 'components/layout/Header';
import styled from 'styled-components';
import Landing from './Landing';

const Container = styled.div({
    display: 'grid',
    gridTemplateRows: '90px 1fr 90px',
    height: '100%',
    width: '100%'
});

const HomePage = () => {
    return (
        <Container>
            <Header />

            <Section>
                <Landing />
            </Section>
        </Container>
    );
};

export default HomePage;
