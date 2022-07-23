import CourseService from 'api/services/course';
import DelayWrapper from 'components/common/DelayWrapper';
import LoadingIndicator from 'components/common/LoadingIndicator';
import Typography from 'components/common/Typography';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import { ChangeEvent, KeyboardEventHandler, useEffect, useRef, useState } from 'react';
import { SidebarContext } from 'state/sidebar';
import styled, { useTheme } from 'styled-components';
import { useContext } from 'utils/context';

const Container = styled.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
});

const Header = styled.div((props) => ({
    position: 'sticky',
    backgroundColor: props.theme.palette.background,
    top: 74, // Height of sidebar header
    padding: '0 0 16px 0',

    [`@media (min-width: 480px)`]: {
        top: 90, // Height of sidebar header
        padding: '0 0 16px 0'
    }
}));

const InputContainer = styled.div({
    position: 'relative'
});

const Input = styled.input<{ isLoading: boolean }>((props) => ({
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
    borderBottom: `1px solid ${props.theme.palette.horizontalLine}`,
    transition: `border-bottom-color ${props.theme.transitionDuration}ms ease-in-out`,

    ':focus': {
        borderBottomColor: props.theme.palette.text
    }
}));

const LoadingContainer = styled.div({
    position: 'absolute',
    right: 0,
    top: '6px'
});

const InputError = styled(Typography)((props) => ({
    marginTop: '12px',
    color: props.theme.palette.error
}));

const SearchResults = styled.div({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
});

const ResultCard = styled.button((props) => ({
    all: 'unset',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    backgroundColor: props.theme.palette.card,
    borderRadius: '4px',
    transition: `background-color 100ms ease-in-out`,

    ':focus': {
        backgroundColor: props.theme.palette.popup
    },

    '@media (hover: hover)': {
        ':hover': {
            backgroundColor: props.theme.palette.popup
        }
    }
}));

export default function Search() {
    const theme = useTheme();

    const router = useRouter();

    const { setSidebarOpen } = useContext(SidebarContext);

    const [search, setSearch] = useState<string>('');
    const debouncedSearch = useDebounce(search, 200);

    const { courses, isValidating, isLoading, isError } =
        CourseService.useCourseSearch(debouncedSearch);

    const debouncedLoading = useDebounce(isValidating && isLoading, 1000);

    const [error, setError] = useState<string>();

    useEffect(() => {
        if (courses && courses.length === 0) {
            setError('Ingen emner med gitt kode/navn.');
        }
    }, [courses]);

    useEffect(() => {
        if (isError) {
            setError('Kunne ikke hente emner.');
        }
    }, [isError]);

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchInputRef]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(undefined);
        setSearch(e.target.value);
    };

    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = async (e) => {
        if (e.key === 'Enter') {
            setError(undefined);
            if (search.length >= 3) {
                const courses = await CourseService.getCourses(search).catch(() => {
                    setError('Kunne ikke hente emner.');
                });

                if (courses) {
                    if (courses.length === 1) {
                        navigate(courses[0].course);
                    } else if (courses.length === 0) {
                        setError('Ingen emner med gitt kode/navn.');
                    }
                }
            } else if (search.length > 0) {
                setError('Ingen emner med gitt kode/navn.');
            } else {
                setError('Vennligst fyll inn emnekode/emnenavn.');
            }
        }
    };

    const navigate = (course: string) => {
        setSidebarOpen(false);
        setTimeout(() => {
            router.push(`/course/${course}`);
        }, theme.transitionDuration);
    };

    return (
        <Container>
            <Header>
                <InputContainer>
                    <Input
                        ref={searchInputRef}
                        type="text"
                        value={search}
                        onChange={handleSearchChange}
                        placeholder="Emnekode eller navn"
                        spellCheck={false}
                        onKeyPress={handleKeyPress}
                        isLoading={debouncedLoading}
                    />
                    {isValidating && isLoading && (
                        <DelayWrapper delay={1000}>
                            <LoadingContainer>
                                <LoadingIndicator />
                            </LoadingContainer>
                        </DelayWrapper>
                    )}
                </InputContainer>
                {error && <InputError variant="body2">{error}</InputError>}
            </Header>
            <SearchResults>
                {!error &&
                    !isValidating &&
                    !isLoading &&
                    courses &&
                    courses.length > 0 &&
                    courses.map((course, index) => (
                        <ResultCard key={index} onClick={() => navigate(course.course)}>
                            <Typography variant="body2">{course.course}</Typography>
                            <Typography variant="body1" style={{ color: theme.palette.heading }}>
                                {course.name}
                            </Typography>
                        </ResultCard>
                    ))}
            </SearchResults>
        </Container>
    );
}
