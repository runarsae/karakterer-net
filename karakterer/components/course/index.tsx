import styled from 'styled-components';
import Section from 'components/common/Section';
import Header from './Header';
import { CourseWithGrades } from 'api/course';
import Dashboard from './Dashboard';
import { SidebarContext, SidebarContextProvider, SidebarType } from 'state/sidebar';
import { SettingsContextProvider } from 'state/settings';
import Sidebar from 'components/common/Sidebar';
import { useContext } from 'utils/context';
import Search from 'components/search/Search';
import About from 'components/about/About';

const Wrapper = styled.div((props) => ({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: 'auto',
    marginBottom: 'auto',

    [`@media (min-width: ${props.theme.breakpoints.md}px)`]: {
        gap: '24px'
    }
}));

const CoursePage = ({ course, name, grades }: CourseWithGrades) => {
    const { sidebarOpen, setSidebarOpen, sidebarType } = useContext(SidebarContext);

    return (
        <>
            <Section>
                <Wrapper>
                    <Header course={course} name={name} />
                    <Dashboard grades={grades} />
                </Wrapper>
            </Section>

            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen}>
                {sidebarType == SidebarType.Search ? (
                    <Search />
                ) : sidebarType == SidebarType.About ? (
                    <About />
                ) : (
                    <></>
                )}
            </Sidebar>
        </>
    );
};

export default CoursePage;
