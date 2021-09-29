import { Row, Col , Container} from 'react-bootstrap';
import Section from '../../layout/Section';
import { useAllProposals } from '../../wrappers/nounsDao';
import classes from './Profile.module.css';


interface ProfilePageProps {
  nounId?: number;
}

const ProfilePage: React.FC<ProfilePageProps> = props => {
  const { nounId } = props

  const { data: proposals } = useAllProposals();

  return (
    <Section bgColor={classes.whiteBg} fullWidth={false}>
      <Container>
        <Row>
          <Col sm={4}>
            TODO noun profile card goes here
          </Col>
          <Col sm={8}>
            TODO noun history feed goes here
          </Col>
        </Row>
      </Container>
    </Section>
  );
};
export default ProfilePage;