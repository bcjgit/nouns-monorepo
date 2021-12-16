import { Button, Row, Container, Col } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import classes from './Winner.module.css';
import ShortAddress from '../ShortAddress';
import { Link } from 'react-router-dom';

const Winner: React.FC<{ winner: string }> = props => {
  const { winner } = props;
  const activeAccount = useAppSelector(state => state.account.activeAccount);

  return (
    <Container>
    <Row className={classes.section}>
      <Col xs={4} lg={12}>
        <h4>Winner</h4>
      </Col>
      <Col xs='auto' lg={12}>
        <h2>
          {activeAccount !== undefined &&
          activeAccount.toLocaleLowerCase() === winner.toLocaleLowerCase() ? (
            <Row className={classes.youSection}>
              <Row>You!</Row>
              <Link to="/verify" className={classes.verifyLink}>
                <Button className={classes.verifyButton}>Get Verified</Button>
              </Link>
            </Row>
          ) : (
            <ShortAddress address={winner} avatar={true} />
          )}
        </h2>
      </Col>
    </Row>
    </Container>
  );
};

export default Winner;
