import { useQuery } from '@apollo/client';
import { Row, Col , Container} from 'react-bootstrap';
import { LoadingNoun } from '../../components/Noun';
import NounProfileCard from '../../components/NounProfileCard';
import Section from '../../layout/Section';
import { useAllProposals } from '../../wrappers/nounsDao';
import { nounQuery } from '../../wrappers/subgraph';
import classes from './Profile.module.css';

// TODO make profile without a param redirect to directory page
interface ProfilePageProps {
  nounId: number;
}

const ProfilePage: React.FC<ProfilePageProps> = props => {
  const { nounId } = props

  const { data: proposals } = useAllProposals();
  const {loading, error, data} = useQuery(nounQuery(nounId.toString()));

  if (loading) {
    return (
      <LoadingNoun/>
    );
  } else if (error) {
    return (
      <div>
        Error retriving noun info
      </div>
    );
  } else {
    return (
      <Section bgColor={classes.whiteBg} fullWidth={false}>
        <Container>
          <Row>
            <Col sm={4}>
              <NounProfileCard nounId={nounId} currentCaretakerAddress={data && data.noun.owner.id}/>
            </Col>
            <Col sm={8}>
              TODO noun history feed goes here
            </Col>
          </Row>
        </Container>
      </Section>
    );
  }
};
export default ProfilePage;