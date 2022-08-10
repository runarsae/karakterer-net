import Section from 'components/common/Section';
import Header from './Header';
import Dashboard from './Dashboard';
import Sidebar from 'components/common/Sidebar';
import { useDashboardState } from 'state/dashboard';
import { CourseWithGrades } from 'lib/getCourseData';

const CoursePage = ({ course, name, grades }: CourseWithGrades) => {
    const [state, dispatch] = useDashboardState(grades);

    if (state) {
        return (
            <>
                <Section>
                    <Header course={course} name={name} />
                    <Dashboard state={state} dispatch={dispatch} />
                </Section>

                <Sidebar />
            </>
        );
    }

    return null;
};

export default CoursePage;
