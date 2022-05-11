import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import Typography from './Typography';

const RadioInput = styled.input.attrs({ type: 'radio' })`
    ${{
        position: 'fixed',
        width: 0
    }}
`;

const Label = styled.label<{ checked: boolean; disabled?: boolean }>((props) => ({
    display: 'flex',
    boxSizing: 'border-box',
    height: 20,
    paddingLeft: 32,
    alignItems: 'center',
    position: 'relative',
    ...(!props.disabled && { cursor: 'pointer' }),
    ...(props.disabled && { opacity: 0.38 }),

    // Outside circle
    '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '16px',
        height: '16px',
        border: `2px solid ${
            props.checked ? props.theme.palette.primary.main : props.theme.palette.text
        }`,
        borderRadius: '100%'
    },

    // Inside dot
    '&::after': {
        opacity: props.checked ? 1 : 0,
        transform: props.checked ? 'scale(1)' : 'scale(0)',
        content: '""',
        width: '10px',
        height: '10px',
        background: props.theme.palette.primary.main,
        position: 'absolute',
        top: '5px',
        left: '5px',
        borderRadius: '100%',
        transition: `all ${props.theme.transitionDuration}ms ease`
    }
}));

interface Props {
    group: string;
    label: string;
    value: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    disabled?: boolean;
}

function RadioButton({ group, label, value, checked, onChange, disabled }: Props) {
    return (
        <>
            <RadioInput
                disabled={disabled}
                id={label}
                name={group}
                value={value}
                onChange={onChange}
                checked={checked}
                onKeyDown={(e) => {
                    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') {
                        e.preventDefault();
                    }
                }}
            />
            <Label htmlFor={label} checked={checked} disabled={disabled}>
                <Typography variant="body1">{label}</Typography>
            </Label>
        </>
    );
}

export default RadioButton;
