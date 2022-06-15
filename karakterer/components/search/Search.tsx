import Typography from 'components/common/Typography';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
    children?: ReactNode;
}

export default function Search({ children }: Props) {
    return (
        <Typography variant="h2" style={{ lineHeight: '42px' }}>
            Søk
        </Typography>
    );
}
