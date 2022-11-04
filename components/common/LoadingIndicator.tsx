import styled from 'styled-components';
import Animation from './animations/Animation';
import { AnimationType } from './animations/animations';

const Spinner = styled(Animation)<Props>((props) => ({
    border: `2px solid ${props.theme.palette.popup.main}`,
    borderTop: `2px solid ${props.theme.palette.primary.main}`,
    borderRadius: '50%',
    width: props.size === 'large' ? '40px' : '22px',
    height: props.size === 'large' ? '40px' : '22px'
}));

interface Props {
    size?: 'large' | 'normal';
}

export default function LoadingIndicator(props: Props) {
    return (
        <Spinner type={AnimationType.Rotate} duration={1000} timingFunction="linear" {...props} />
    );
}
