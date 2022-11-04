import Animation from 'components/common/animations/Animation';
import { AnimationType } from 'components/common/animations/animations';
import LoadingIndicator from 'components/common/LoadingIndicator';
import styled from 'styled-components';

const LoadingContainer = styled.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '16px'
});

function Loading() {
    return (
        <LoadingContainer>
            <Animation type={AnimationType.FadeIn} count={1} duration={300}>
                <LoadingIndicator size="large" />
            </Animation>
        </LoadingContainer>
    );
}

export default Loading;
