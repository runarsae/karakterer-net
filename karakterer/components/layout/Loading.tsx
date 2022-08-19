import LoadingIndicator from 'components/common/LoadingIndicator';
import Section from 'components/common/Section';
import styled from 'styled-components';

const LoadingContainer = styled.div({
    margin: 'auto'
});

function Loading() {
    return (
        <Section>
            <LoadingContainer>
                <LoadingIndicator size="large" />
            </LoadingContainer>
        </Section>
    );
}

export default Loading;
