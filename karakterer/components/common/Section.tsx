import styled from 'styled-components';

const Wrapper = styled.section({
    width: '100%',
    margin: 'auto'
});

const Content = styled.div((props) => ({
    padding: '16px',
    maxWidth: '1440px',
    width: '100%',
    margin: 'auto',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '40px'
    }
}));

interface Props {
    children: React.ReactNode;
}

function Section(props: Props) {
    return (
        <Wrapper>
            <Content>{props.children}</Content>
        </Wrapper>
    );
}

export default Section;
