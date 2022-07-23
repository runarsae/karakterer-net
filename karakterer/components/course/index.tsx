import styled from 'styled-components';
import Section from 'components/common/Section';
import Header from './Header';
import Dashboard from './Dashboard';
import Sidebar from 'components/common/Sidebar';
import { CourseWithGrades } from 'lib/getCourseData';

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
    // TODO: Move initialization of semesterDisplay here

    return (
        <>
            <Section>
                <Wrapper>
                    <Header course={course} name={name} />
                    <Dashboard grades={grades} />
                </Wrapper>
            </Section>

            <Sidebar />
        </>
    );
};

export default CoursePage;
