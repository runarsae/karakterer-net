import LoadingIndicator from 'components/common/LoadingIndicator';
import styled, { useTheme } from 'styled-components';

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
    const theme = useTheme();

    return (
        <LoadingContainer>
            <LoadingIndicator size="large" />
        </LoadingContainer>
    );
}

export default Loading;
