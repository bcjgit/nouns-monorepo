import { Button, Row, Container, Col } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import classes from './Winner.module.css';
import ShortAddress from '../ShortAddress';
import { Link } from 'react-router-dom';

interface WinnerProps {
  winner: string;
  isNounders?: boolean;
}

const Winner: React.FC<WinnerProps> = props => {
  const { winner , isNounders } = props;
  const activeAccount = useAppSelector(state => state.account.activeAccount);

  const nonNounderNounContent = activeAccount !== undefined &&
  activeAccount.toLocaleLowerCase() === winner.toLocaleLowerCase() ? (
    <Row className={classes.youSection}>
      <Row>You!</Row>
      <Link to="/verify" className={classes.verifyLink}>
        <Button className={classes.verifyButton}>Get Verified</Button>
      </Link>
    </Row>
  ) : (
    <ShortAddress address={winner} avatar={true} />
  ); 

  const nounderNounContent = (
    <h2>nounders.eth</h2>
  );

  return (
    <Container className={classes.wrapper}>
      <Row className={classes.section}>
        <Col xs={1} lg={12} className={classes.leftCol}>
          <h4>Winner</h4>
        </Col>
        <Col xs='auto' lg={12}>
          <h2>
            {isNounders ? nounderNounContent : nonNounderNounContent}
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

export default Winner;
