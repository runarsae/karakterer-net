import Section from 'components/common/Section';
import Dashboard from './Dashboard';
import { useDashboardState } from 'state/dashboard';
import styled from 'styled-components';
import { CourseWithGrades } from 'lib/getCourseData';
import Title from './Title';
import { Fade } from 'react-awesome-reveal';

const Container = styled(Section)({
    paddingTop: 0
});

const CoursePage = ({ grades, course, name }: CourseWithGrades) => {
    const [state, dispatch] = useDashboardState(grades);

    if (state) {
        return (
            <Fade triggerOnce duration={300}>
                <Container>
                    <Title course={course} name={name} />
                    <Dashboard state={state} dispatch={dispatch} />
                </Container>
            </Fade>
        );
    }

    return null;
};

export default CoursePage;
