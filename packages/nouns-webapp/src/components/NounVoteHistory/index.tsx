import { Proposal } from '../../wrappers/nounsDao';
import { Alert, Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProposalStatus from '../ProposalStatus';
import classes from './NounVoteHistory.module.css';
import { proposalVoterQuery } from '../../wrappers/subgraph';
import { useQuery } from '@apollo/client';
import {Image} from 'react-bootstrap';





const NounVoteRow: React.FC<{id: number, title: string, status: number, nounOwnerAddress: string}> = props => {

  const { id , title, status, nounOwnerAddress} = props;

  const {loading, error, data } = useQuery(proposalVoterQuery(id.toString()));

  if (loading || error) {
    return (
      <div>
        something went wrong
      </div>
    );
  }

  const voteInfo = data.proposals[0]?.votes.filter((vote: { voter: { id: string; }; }) => vote.voter.id == nounOwnerAddress);
  var support = "";
  if (!voteInfo || voteInfo.length == 0) {
    support = "Absent";
  } else if (voteInfo[0].support) {
    support = "For";
  } else {
    support = "Against";
  }

  console.log(voteInfo);
  if (support == "Absent") {
    return (<></>);
  }

  return (
    <li key={id} className={classes.bidRow}>
      <div className={classes.proposals}>
      <Container>      
        {/* <Col>
          {title}
        </Col>
        <Col>
          <ProposalStatus status={status}></ProposalStatus>
        </Col>
        <Col>
        {support}
        </Col> */}
        <Image src={"https://icons.getbootstrap.com/assets/icons/check2-circle.svg"}/>
        <Col>
        <strong>Noun 47</strong> voted <strong style={{color: 'green'}}>{support}</strong> proposition <strong><a  style={{color: 'black'}} href="#">{title}</a></strong>
        </Col>
      </Container>
      </div>
    </li>
  );

};

const NounVoteHistory = ({ proposals, nounOwnerAddress}: { proposals: Proposal[], nounOwnerAddress: string }) => {


  return (
    <div>
      {/* TODO put this into a css class */}
      <Container>
        <Row>
          <h3 className={classes.heading}>Recent Activity</h3>
        </Row>
        {/* <Row style={{
          fontWeight: 'bold'
        }}>
          <Col style={{paddingLeft: 0}}>
            Proposal
          </Col>
          <Col>
            Status
          </Col>
          <Col>
            Voted
          </Col>
        </Row> */}
      </Container>




      {/* TODO this is just prototyping ... abstact this into a component and or set of components */}
      <ul className={classes.bidCollection}>
        {/* <NounVoteRow id = {1}/>
        <NounVoteRow id = {2}/>
        <NounVoteRow id = {3}/> */}
        {proposals?.length ? (
          proposals
          .slice(0)
          .reverse()
          .slice(0, 10) // Take first 10 elements of list
          .map((p,i) => {
            return (
              <NounVoteRow id = {i} title={p.title} status={p.status} nounOwnerAddress={nounOwnerAddress} />
            );
          })
        ): (
          <div>
            no data
          </div>
        )}
      </ul>

      {/* {proposals?.length ? (
        proposals
          .slice(0)
          .reverse()
          .map((p, i) => {
            return (
              <Button
                className={classes.proposalLink}
                variant="dark"
                as={Link}
                to={`/vote/${p.id}`}
                key={i}
              >
                <span>
                  <span>{p.id}.</span> <span>{p.title}</span>
                </span>
                <ProposalStatus status={p.status}></ProposalStatus>
              </Button>
            );
          })
      ) : (
        <Alert variant="secondary">
          <Alert.Heading>No proposals found.</Alert.Heading>
          <p>Proposals submitted by community members will appear here.</p>
        </Alert>
      )} */}
    </div>
  );
};
export default NounVoteHistory;
