import { Proposal } from '../../wrappers/nounsDao';
import { Alert, Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProposalStatus from '../ProposalStatus';
import classes from './NounVoteHistory.module.css';




const NounVoteRow: React.FC<{id: number, title: string, status: number}> = props => {

  const { id , title, status} = props;
  return (
    <li key={id} className={classes.bidRow}>
      <div className={classes.proposals}>
      <Container>      
        <Col>
          {title}
        </Col>
        <Col>
          <ProposalStatus status={status}></ProposalStatus>
        </Col>
        <Col>
          👍
        </Col>
      </Container>
      </div>
    </li>
  );

};

const NounVoteHistory = ({ proposals }: { proposals: Proposal[] }) => {


  console.log(proposals);
  return (
    <div className={classes.proposals}>
      <div>
        <h3 className={classes.heading}>Recent Activity</h3>
      </div>

      {/* TODO put this into a css class */}
      <Container style={{
        fontWeight: 'bold'
      }}>
        <Col>
          Proposal
        </Col>
        <Col>
          Status
        </Col>
        <Col>
          Voted For
        </Col>
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
              <NounVoteRow id = {i} title={p.title} status={p.status}/>
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
