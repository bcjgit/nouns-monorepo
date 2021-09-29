import { Row, Col , Container} from 'react-bootstrap';
import Section from '../../layout/Section';
import { useAllProposals } from '../../wrappers/nounsDao';
import NounVoteHistory from '../../components/NounVoteHistory';
import NounProfileCard from '../../components/NounProfileCard';
import { useQuery } from '@apollo/client';
import { accountQuery, nounQuery } from '../../wrappers/subgraph';


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
  // TODO confirm that this is the best way to do this ... look how they did it in Auction
  var nounIdToString = "";
  if (nounId) {
      nounIdToString = nounId.toString();
  }
  const { loading, error, data } = useQuery(nounQuery(nounIdToString));

  var ownerId = "";
  if (data) {
    ownerId = data.noun.owner.id;
  }


  console.log(data);
  if (!nounId || loading || error ) {
    return (
        <div>
            Failed to load noun info
        </div>
    );
}

  return (
    <Section bgColor="white" fullWidth={false}>
      <Container>
        <Row>
          <Col sm={4}>
            <NounProfileCard nounId={nounId} nounOwnerAddress={data && data.noun.owner.id}/>
          </Col>
          <Col sm={8}>
            {/* TODO this will be repaled with a diff component */}
            <NounVoteHistory proposals={proposals} nounOwnerAddress={data && data.noun.owner.id} />
          </Col>
        </Row>
      </Container>
    </Section>
  );
};
export default ProfilePage;
