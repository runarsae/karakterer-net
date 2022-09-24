import LoadingIndicator from 'components/common/LoadingIndicator';
import Head from 'next/head';
import { Fade } from 'react-awesome-reveal';
import styled, { useTheme } from 'styled-components';

const LoadingContainer = styled.div({
    margin: 'auto'
});

function Loading() {
    const theme = useTheme();

    return (
        <>
            <Head>
                <title>karakterer.net</title>
            </Head>

            <LoadingContainer>
                <Fade triggerOnce delay={500} duration={theme.transitionDuration}>
                    <LoadingIndicator size="large" />
                </Fade>
            </LoadingContainer>
        </>
    );
}

export default Loading;
