import { Body2 } from 'components/common/Typography';
import styled from 'styled-components';

const ErrorMessage = styled(Body2)((props) => ({
    color: props.theme.palette.error,
    padding: '0 0 16px 0',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '0 0 24px 0'
    }
}));

interface Props {
    error: string;
}

function Error({ error }: Props) {
    return <ErrorMessage>{error}</ErrorMessage>;
}

export default Error;
