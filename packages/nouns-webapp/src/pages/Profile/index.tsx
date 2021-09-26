import { Row, Col , Container} from 'react-bootstrap';
import StandaloneNoun from '../../components/StandaloneNoun';
import Section from '../../layout/Section';
import { useAllProposals } from '../../wrappers/nounsDao';
import NounVoteHistory from '../../components/NounVoteHistory';
import classes from './Profile.module.css';
import { BigNumber } from 'ethers';
interface ProfilePageProps {
  nounId?: number;
}

/*
General idea of components / layout is this;

2 equal ish vertical cols

L  |  R

nounProfilePic  | NounVotingHistory
----------------
NounInfo / Gems


TODO need to have something to come up for invalid (i.e. not yet minted nouns)
*/

const ProfilePage: React.FC<ProfilePageProps> = props => {
  const { nounId } = props

  // TODO this will be replaced with a diff gql query
  const { data: proposals } = useAllProposals();

  return (
    <Section bgColor="transparent" fullWidth={false}>
      <Container>
        <Row>
          <Col sm={4}>
            <Row>
               <StandaloneNoun nounId={BigNumber.from(nounId)}/>
            </Row>
            <Row>
              <h1 className={classes.heading}>Noun {nounId}</h1>
            </Row>
            <Row>
              <h2 className={classes.birthday}>Sept 23, 2022</h2>
            </Row>
            <Row>
            <p style={{fontWeight: 'bold'}}>Operated By</p>
            </Row>
            <Row>
            <h2 className={classes.subHeading}>dragonfly.eth</h2>
            </Row>
          </Col>
          <Col sm={8}>
            {/* TODO this will be repaled with a diff component */}
            <NounVoteHistory proposals={proposals} />
          </Col>
        </Row>
      </Container>
    </Section>
  );
};
export default ProfilePage;
