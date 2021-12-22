import BigNumber from 'bignumber.js';
import classes from './CurrentBid.module.css';
import TruncatedAmount from '../TruncatedAmount';
import { Row, Container, Col } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
/**
 * Passible to CurrentBid as `currentBid` prop to indicate that
 * the bid amount is not applicable to this auction. (Nounder Noun)
 */
export const BID_N_A = 'n/a';

/**
 * Special Bid type for not applicable auctions (Nounder Nouns)
 */
type BidNa = typeof BID_N_A;

const CurrentBid: React.FC<{ currentBid: BigNumber | BidNa; auctionEnded: boolean }> = props => {
  const { currentBid, auctionEnded } = props;
  const isCool = useAppSelector(state => state.application.stateBackgroundColor) === "#d5d7e1";
  const titleContent = auctionEnded ? 'Winning bid' : 'Current bid';

  return (
    <Container className={classes.wrapper}>
      <Row className={classes.section}>
        <Col xs={5} lg={12} className={classes.leftCol}>
          <h4 style={{color: isCool ? "var(--brand-cool-light-text)" : "var(--brand-warm-light-text)"}}>{titleContent}</h4>
        </Col>
        <Col xs="auto" lg={12}>
          <h2 style={{color: isCool ? "var(--brand-cool-dark-text)" : "var(--brand-warm-dark-text)"}}>
            {currentBid === BID_N_A ? (
              BID_N_A
            ) : (
              <TruncatedAmount amount={currentBid && currentBid} />
            )}
          </h2>
        </Col>
      </Row>
    </Container>
  );
};

export default CurrentBid;
