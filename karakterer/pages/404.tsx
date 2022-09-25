import Section from 'components/common/Section';
import { Body1, Heading1 } from 'components/common/Typography';

function Custom404() {
    return (
        <Section>
            <Heading1>Error: 404</Heading1>
            <Body1>Den forespurte siden ble ikke funnet.</Body1>
        </Section>
    );
}

export default Custom404;
