import Section from 'components/common/Section';
import Typography from 'components/common/Typography';

function Custom404() {
    return (
        <Section>
            <Typography variant="h1">Error: 404</Typography>
            <Typography variant="body1">Den forespurte siden ble ikke funnet.</Typography>
        </Section>
    );
}

export default Custom404;
