import Card from 'components/common/Card';
import { CourseSearch } from 'hooks/useCourseSearch';
import styled from 'styled-components';
import Error from './Error';
import Input from './Input';
import Results from './Results';

const HeaderWrapper = styled.div({
    position: 'sticky',
    top: 74,
    left: 0,
    width: '100%'
});

const Header = styled(Card)({
    borderRadius: 0,
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0
});

export default function SidebarSearch({
    search,
    setSearch,
    courses,
    loading,
    error
}: CourseSearch) {
    return (
        <>
            <HeaderWrapper>
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
            {error ? (
                <Error error={error} />
            ) : (
                courses !== undefined && courses.length > 0 && <Results courses={courses} />
            )}
        </>
    );
}
