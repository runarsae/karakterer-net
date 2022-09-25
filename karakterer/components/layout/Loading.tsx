import LoadingIndicator from 'components/common/LoadingIndicator';
import Section from 'components/common/Section';
import { Fade } from 'react-awesome-reveal';
import styled, { useTheme } from 'styled-components';

const LoadingContainer = styled.div({
    margin: '64px auto'
});

function Loading() {
    const theme = useTheme();

    return (
        <Section>
            <LoadingContainer>
                <Fade triggerOnce duration={theme.transitionDuration}>
                    <LoadingIndicator size="large" />
                </Fade>
            </LoadingContainer>
        </Section>
    );
}

export default Loading;
