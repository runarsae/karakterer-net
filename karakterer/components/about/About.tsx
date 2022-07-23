import Typography from 'components/common/Typography';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    children?: ReactNode;
}

export default function About({ children }: Props) {
    return (
        <Typography variant="h2" style={{ lineHeight: '42px' }}>
            Om KARAKTERER.net
        </Typography>
    );
}
