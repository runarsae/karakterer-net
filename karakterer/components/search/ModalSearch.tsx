import useResizeObserver from '@react-hook/resize-observer';
import Card from 'components/common/Card';
import { CourseSearch } from 'hooks/useCourseSearch';
import { useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import Error from './Error';
import Input from './Input';
import Results from './Results';

const Container = styled.div({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    pointerEvents: 'none'
});

const PopupCard = styled(Card)<{ height: number; scrollbarVisible: boolean }>((props) => ({
    backgroundColor: props.theme.palette.popup.main,
    pointerEvents: 'auto',
    position: 'relative',
    paddingTop: 0,
    paddingBottom: 0,
    overflowY: props.scrollbarVisible ? 'auto' : 'hidden',
    height: props.height,
    transition: `height ${props.theme.transitionDuration}ms ease-out`
}));

const HeaderWrapper = styled.div({
    position: 'sticky',
    top: 0,
    left: 0,
    width: '100%'
});

const Header = styled(Card)((props) => ({
    backgroundColor: props.theme.palette.popup.main,
    borderRadius: 0,
    paddingLeft: 0,
    paddingRight: 0
}));

export default function ModalSearch({ search, setSearch, courses, loading, error }: CourseSearch) {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const [containerHeight, setContainerHeight] = useState<number>(0);
    const [headerHeight, setHeaderHeight] = useState<number>(0);
    const [contentHeight, setContentHeight] = useState<number>(0);

    useResizeObserver(containerRef, (entry) => setContainerHeight(entry.target.clientHeight));
    useResizeObserver(headerRef, (entry) => setHeaderHeight(entry.target.scrollHeight));
    useResizeObserver(contentRef, (entry) => setContentHeight(entry.target.scrollHeight));

    const computedCardHeight = useMemo(() => {
        if (headerHeight + contentHeight > containerHeight) {
            return containerHeight;
        }

        return headerHeight + contentHeight;
    }, [headerHeight, contentHeight, containerHeight]);

    const scrollbarVisible = useMemo(
        () => headerHeight + contentHeight > containerHeight,
        [headerHeight, contentHeight, containerHeight]
    );

    return (
        <Container ref={containerRef}>
            <PopupCard height={computedCardHeight} scrollbarVisible={scrollbarVisible}>
                <HeaderWrapper ref={headerRef}>
                    <Header>
                        <Input
                            search={search}
                            onSearchChange={setSearch}
                            error={error}
                            loading={loading}
                            courses={courses}
                        />
                    </Header>
                </HeaderWrapper>
                <div ref={contentRef}>
                    {error ? (
                        <Error error={error} />
                    ) : (
                        courses !== undefined && courses.length > 0 && <Results courses={courses} />
                    )}
                </div>
            </PopupCard>
        </Container>
    );
}
