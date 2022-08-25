import useResizeObserver from '@react-hook/resize-observer';
import Card from 'components/common/Card';
import DelayWrapper from 'components/common/DelayWrapper';
import { SearchIcon } from 'components/common/icons';
import LoadingIndicator from 'components/common/LoadingIndicator';
import Typography from 'components/common/Typography';
import useCourseSearch from 'hooks/useCourseSearch';
import useDebounce from 'hooks/useDebounce';
import { useRouter } from 'next/router';
import {
    ChangeEvent,
    KeyboardEventHandler,
    MouseEvent,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { ModalContext } from 'state/modal';
import styled, { useTheme } from 'styled-components';
import { useContext } from 'utils/context';

const Container = styled.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

const PopupCard = styled(Card)<{ height: number; scrollbarVisible: boolean }>((props) => ({
    paddingTop: 0,
    paddingBottom: 0,
    overflowY: props.scrollbarVisible ? 'auto' : 'hidden',
    height: props.height,
    width: '100%',
    transition: `height ${props.theme.transitionDuration}ms ease-out`
}));

const Header = styled.div((props) => ({
    position: 'sticky',
    backgroundColor: props.theme.palette.card.main,
    top: 0,
    padding: '16px 0',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '24px 0'
    }
}));

const InputContainer = styled.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '16px'
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
    borderBottom: `1px solid ${props.theme.palette.horizontalLine}`
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

const SearchResults = styled.div((props) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0 0 16px 0',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        padding: '0 0 24px 0'
    }
}));

const ResultCard = styled.button((props) => ({
    all: 'unset',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    backgroundColor: props.theme.palette.popup.main,
    borderRadius: '4px',
    transition: `background-color 100ms ease-in-out`,

    ':focus': {
        backgroundColor: props.theme.palette.popup.hover
    },

    '@media (hover: hover)': {
        ':hover': {
            backgroundColor: props.theme.palette.popup.hover
        }
    }
}));

export default function Search() {
    const theme = useTheme();
    const router = useRouter();

    const { setModalOpen } = useContext(ModalContext);

    const { search, setSearch, courses, loading, error } = useCourseSearch();

    const debouncedLoading = useDebounce(loading, 1000);

    const hasSearchResults = !error && courses !== undefined && courses.length > 0;

    const navigate = (course: string) => {
        setModalOpen(false);
        router.push(`/course/${course}`);
    };

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = async (e) => {
        if (e.key === 'Enter') {
            if (!error && !loading && courses && courses.length === 1) {
                navigate(courses[0].course);
            }
        }
    };

    const handleContainerClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setModalOpen(false);
        }
    };

    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchInputRef]);

    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const searchResultsRef = useRef<HTMLDivElement>(null);

    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [searchResultsHeight, setSearchResultsHeight] = useState<number>(0);

    useResizeObserver(containerRef, (entry) => setContainerHeight(entry.target.scrollHeight));
    useResizeObserver(headerRef, (entry) => setHeaderHeight(entry.target.scrollHeight));
    useResizeObserver(searchResultsRef, (entry) =>
        setSearchResultsHeight(entry.target.scrollHeight)
    );

    const popupCardHeight = useMemo(() => {
        if (error) {
            return headerHeight;
        }

        const popupCardScrollHeight = headerHeight + searchResultsHeight;

        if (popupCardScrollHeight > containerHeight) {
            return containerHeight;
        }

        return popupCardScrollHeight;
    }, [containerHeight, error, headerHeight, searchResultsHeight]);

    const scrollbarVisible = useMemo(
        () => headerHeight + searchResultsHeight > containerHeight,
        [headerHeight, searchResultsHeight, containerHeight]
    );

    return (
        <Container onClick={handleContainerClick} ref={containerRef}>
            <PopupCard height={popupCardHeight} scrollbarVisible={scrollbarVisible}>
                <Header ref={headerRef}>
                    <InputContainer>
                        <SearchIcon width={24} height={24} />
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
                        {loading && (
                            <DelayWrapper delay={1000}>
                                <LoadingContainer>
                                    <LoadingIndicator />
                                </LoadingContainer>
                            </DelayWrapper>
                        )}
                    </InputContainer>
                    {error && <InputError variant="body2">{error}</InputError>}
                </Header>
                <div ref={searchResultsRef}>
                    {hasSearchResults && (
                        <SearchResults>
                            {courses.map((course, index) => (
                                <ResultCard key={index} onClick={() => navigate(course.course)}>
                                    <Typography variant="body2">{course.course}</Typography>
                                    <Typography
                                        variant="body1"
                                        style={{ color: theme.palette.heading }}
                                    >
                                        {course.name}
                                    </Typography>
                                </ResultCard>
                            ))}
                        </SearchResults>
                    )}
                </div>
            </PopupCard>
        </Container>
    );
}
