import { Row, Col } from 'react-bootstrap';
import StandaloneNoun from '../../components/StandaloneNoun';
import Section from '../../layout/Section';
// import { useAllProposals } from '../../wrappers/nounsDao';
// import Proposals from '../../components/Proposals';
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
  // const { data: proposals } = useAllProposals();

  return (
    <Section bgColor="transparent" fullWidth={false}>
      <Row>
        <Col lg={{span: 6}}>
          {/* Again, just for testing .... horrible anti-pattern */}
          <StandaloneNoun nounId={BigNumber.from(nounId)}/>
          {/* This is def an anti pattern */}
          <br/>
          <br/>
          <h1 className={classes.heading}>Noun {nounId}</h1>
          <h2 className={classes.birthday}>Sept 23, 2022</h2>

          <br/>
          <p style={{fontWeight: 'bold'}}>Operated By</p>
          <h2 className={classes.subHeading}>dragonfly.eth</h2>

        </Col>
        <Col>
          <h1 className={classes.heading}>TODO</h1>
        </Col>
      </Row>
    </Section>
  );
};
export default ProfilePage;
