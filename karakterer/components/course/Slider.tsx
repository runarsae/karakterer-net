import Typography from 'components/common/Typography';
import { useEffect, useRef, useState } from 'react';
import { Range } from 'react-range';
import styled, { useTheme } from 'styled-components';

const Container = styled.div({
    position: 'relative',
    padding: '42px 31px 9px 31px'
});

const Track = styled.div((props) => ({
    ...props.style,
    height: '6px',
    width: '100%',
    backgroundColor: '#1D1D1D',
    borderRadius: '4px'
}));

const Thumb = styled.div<{ isDragged: boolean }>((props) => ({
    ...props.style,
    height: '24px',
    width: '24px',
    borderRadius: '4px',
    transition: `background-color ${props.theme.transitionDuration}ms ease-in-out 0s`,
    backgroundColor: props.isDragged ? '#464645' : '#2D2D2D',
    outline: 'none',

    ':hover': {
        backgroundColor: '#464645'
    }
}));

const Mark = styled.div.attrs((props) => ({ style: { ...props.style } }))`
    ${{
        height: '6px',
        width: '1px',
        backgroundColor: '#2D2D2D'
    }}
`;

const ExtremeTickLabel = styled.div<{ align: 'left' | 'right'; visible: boolean }>((props) => ({
    visibility: props.visible ? 'visible' : 'hidden',
    position: 'absolute',
    top: '0px',
    ...(props.align === 'left' ? { left: '0px' } : { right: '0px' }),
    width: '63px',
    padding: '5px 8px',
    borderRadius: '4px',
    backgroundColor: '#141414',
    userSelect: 'none'
}));

const Label = styled.div({
    position: 'absolute',
    top: '-33px',
    left: '-19px',
    width: '63px',
    padding: '5px 8px',
    borderRadius: '4px',
    backgroundColor: '#252525'
});

interface Props {
    max: number;
    value: number;
    onChange: (value: number) => void;
    label: string;
    minLabel: string;
    maxLabel: string;
}

const Slider = ({ max, value, onChange, label, minLabel, maxLabel }: Props) => {
    const theme = useTheme();

    const [showMinLabel, setShowMinLabel] = useState<boolean>(true);
    const [showMaxLabel, setShowMaxLabel] = useState<boolean>(true);

    const minLabelDivRef = useRef<HTMLDivElement>(null);
    const maxLabelDivRef = useRef<HTMLDivElement>(null);
    const labelDivRef = useRef<HTMLDivElement>(null);

    // Check if two elements are colliding
    const isColliding = (a: HTMLDivElement, b: HTMLDivElement) => {
        const rect1 = a.getBoundingClientRect();
        const rect2 = b.getBoundingClientRect();

        const isInHoriztonalBounds =
            rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x;
        const isInVerticalBounds =
            rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;

        return isInHoriztonalBounds && isInVerticalBounds;
    };

    // Toggle visibility to min/max labels according to if they are colliding with the value label or not
    useEffect(() => {
        if (isColliding(minLabelDivRef.current!, labelDivRef.current!)) {
            setShowMinLabel(false);
        } else {
            setShowMinLabel(true);
        }

        if (isColliding(maxLabelDivRef.current!, labelDivRef.current!)) {
            setShowMaxLabel(false);
        } else {
            setShowMaxLabel(true);
        }
    }, [value]);

    return (
        <Container>
            <ExtremeTickLabel align="left" ref={minLabelDivRef} visible={showMinLabel}>
                <Typography variant="body2" style={{ color: '#464645', textAlign: 'center' }}>
                    {minLabel}
                </Typography>
            </ExtremeTickLabel>
            <ExtremeTickLabel align="right" ref={maxLabelDivRef} visible={showMaxLabel}>
                <Typography variant="body2" style={{ color: '#464645', textAlign: 'center' }}>
                    {maxLabel}
                </Typography>
            </ExtremeTickLabel>
            <Range
                max={max}
                values={[value]}
                onChange={(values) => onChange(values[0])}
                renderTrack={({ props, children }) => <Track {...props}>{children}</Track>}
                renderThumb={({ props, isDragged }) => (
                    <Thumb {...props} isDragged={isDragged} onKeyDown={undefined}>
                        <Label ref={labelDivRef}>
                            <Typography
                                variant="body2"
                                style={{ color: theme.palette.heading, textAlign: 'center' }}
                            >
                                {label}
                            </Typography>
                        </Label>
                    </Thumb>
                )}
                renderMark={({ props, index }) => {
                    if (index !== 0 && index !== max) {
                        return <Mark {...props} />;
                    }
                }}
            />
        </Container>
    );
};

export default Slider;
