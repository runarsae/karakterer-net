import { Course } from '@prisma/client';
import Card from 'components/common/Card';
import DelayWrapper from 'components/common/DelayWrapper';
import { SearchIcon } from 'components/common/icons';
import LoadingIndicator from 'components/common/LoadingIndicator';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEventHandler, useEffect, useRef } from 'react';
import styled from 'styled-components';

const InputContainer = styled.div({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: '24px 1fr',
    alignItems: 'center',
    gap: '16px'
});

const InputField = styled.input<{ isLoading: boolean }>((props) => ({
    color: props.theme.palette.heading,
    display: 'block',
    position: 'relative',
    width: '100%',
    height: '34px',
    fontSize: '16px',
    outline: 0,
    padding: `0 ${props.isLoading ? '32px' : 0} 0 0`,
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: 0,
    borderBottom: `1px solid ${props.theme.palette.horizontalLine}`
}));

const LoadingContainer = styled.div({
    position: 'absolute',
    right: 0,
    top: '6px'
});

interface Props {
    search: string;
    onSearchChange: (search: string) => void;
    courses?: Course[];
    error?: string;
    loading: boolean;
}

function Input({ search, onSearchChange, error, loading, courses }: Props) {
    const router = useRouter();

    const debouncedLoading = useDebounce(loading, 1000);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
    };

    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = async (e) => {
        if (e.key === 'Enter') {
            if (!error && !loading && courses && courses.length === 1) {
                router.push(`/course/${courses[0].course}`);
            }
        }
    };

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchInputRef]);

    return (
        <InputContainer>
            <SearchIcon width={24} height={24} />
            <InputField
                ref={searchInputRef}
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Emnekode eller navn"
                spellCheck={false}
                onKeyPress={handleKeyPress}
                isLoading={debouncedLoading}
            />
            {loading && (
                <DelayWrapper delay={1000}>
                    <LoadingContainer>
                        <LoadingIndicator />
                    </LoadingContainer>
                </DelayWrapper>
            )}
        </InputContainer>
    );
}

export default Input;
