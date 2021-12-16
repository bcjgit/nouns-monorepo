import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Auction } from '../../wrappers/nounsAuction';
import classes from './AuctionTimer.module.css';
import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

dayjs.extend(duration);

const AuctionTimer: React.FC<{
  auction: Auction;
  auctionEnded: boolean;
}> = props => {
  const { auction, auctionEnded } = props;

  const [auctionTimer, setAuctionTimer] = useState(0);
  const auctionTimerRef = useRef(auctionTimer); // to access within setTimeout
  auctionTimerRef.current = auctionTimer;

  const timerDuration = dayjs.duration(auctionTimerRef.current, 's');

  // timer logic
  useEffect(() => {
    const timeLeft = (auction && Number(auction.endTime)) - dayjs().unix();

    setAuctionTimer(auction && timeLeft);

    if (auction && timeLeft <= 0) {
      setAuctionTimer(0);
    } else {
      const timer = setTimeout(() => {
        setAuctionTimer(auctionTimerRef.current - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [auction, auctionTimer]);

  const auctionContentLong = auctionEnded ? 'Auction ended' : 'Auction ends in';

  const auctionContentShort = auctionEnded ? 'Auction ended' : 'Time left';

  const flooredMinutes = Math.floor(timerDuration.minutes());
  const flooredSeconds = Math.floor(timerDuration.seconds());

  if (!auction) return null;

  return (
    <div className={classes.auctionTimerSection}>
      <Container className={classes.wrapper}>
        <Row className={classes.section}>
          <Col xs={4} lg={12} className={classes.leftCol}>
            <h4 className={classes.title}>
              {window.innerWidth < 992 ? auctionContentShort : auctionContentLong}
            </h4>
          </Col>
          <Col xs="auto" lg={12}>
            <h2 className={classes.timerWrapper}>
              <div className={classes.timerSection}>
                <span>
                  {`${Math.floor(timerDuration.hours())}`}
                  <span className={classes.small}>h</span>
                </span>
              </div>
              <div className={classes.timerSection}>
                <span>
                  {`${flooredMinutes}`}
                  <span className={classes.small}>m</span>
                </span>
              </div>
              <div className={classes.timerSectionFinal}>
                <span>
                  {`${flooredSeconds}`}
                  <span className={classes.small}>s</span>
                </span>
              </div>
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AuctionTimer;
