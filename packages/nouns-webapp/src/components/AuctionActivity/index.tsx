import { Auction } from '../../wrappers/nounsAuction';
import { useState, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { Row, Col } from 'react-bootstrap';
import classes from './AuctionActivity.module.css';
import bidHistoryClasses from './BidHistory.module.css';
import Bid from '../Bid';
import AuctionTimer from '../AuctionTimer';
import CurrentBid from '../CurrentBid';
import Winner from '../Winner';
import BidHistory from '../BidHistory';
import { Modal } from 'react-bootstrap';
import AuctionNavigation from '../AuctionNavigation';
import AuctionActivityWrapper from '../AuctionActivityWrapper';
import AuctionTitleAndNavWrapper from '../AuctionTitleAndNavWrapper';
import AuctionActivityNounTitle from '../AuctionActivityNounTitle';
import AuctionActivityDateHeadline from '../AuctionActivityDateHeadline';
import BidHistoryBtn from '../BidHistoryBtn';
import StandaloneNoun from '../StandaloneNoun';
import config from '../../config';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import NounInfoCard from '../../components/NounInfoCard';
import TruncatedAmount from '../TruncatedAmount';

const openEtherscanBidHistory = () => {
  const url = buildEtherscanAddressLink(config.addresses.nounsAuctionHouseProxy);
  window.open(url);
};

interface AuctionActivityProps {
  auction: Auction;
  isFirstAuction: boolean;
  isLastAuction: boolean;
  onPrevAuctionClick: () => void;
  onNextAuctionClick: () => void;
  displayGraphDepComps: boolean;
}

const AuctionActivity: React.FC<AuctionActivityProps> = (props: AuctionActivityProps) => {
  const {
    auction,
    isFirstAuction,
    isLastAuction,
    onPrevAuctionClick,
    onNextAuctionClick,
    displayGraphDepComps,
  } = props;

  const [auctionEnded, setAuctionEnded] = useState(false);
  const [auctionTimer, setAuctionTimer] = useState(false);

  const [showBidHistoryModal, setShowBidHistoryModal] = useState(false);
  const showBidModalHandler = () => {
    setShowBidHistoryModal(true);
  };
  const dismissBidModalHanlder = () => {
    setShowBidHistoryModal(false);
  };

  const bidHistoryTitle = (
    <h1>
      Noun {auction && auction.nounId.toString()}
      <br /> Bid History
    </h1>
  );

  const winnerCopy = (
    <>
      Winner
    </>
  );

  const timeLeftCopy = (
    <>
    Time Left
    </>
  )


  // timer logic - check auction status every 30 seconds, until five minutes remain, then check status every second
  useEffect(() => {
    if (!auction) return;

    const timeLeft = Number(auction.endTime) - Math.floor(Date.now() / 1000);

    if (auction && timeLeft <= 0) {
      setAuctionEnded(true);
    } else {
      setAuctionEnded(false);
      const timer = setTimeout(
        () => {
          setAuctionTimer(!auctionTimer);
        },
        timeLeft > 300 ? 30000 : 1000,
      );

      return () => {
        clearTimeout(timer);
      };
    }
  }, [auctionTimer, auction]);

  if (!auction) return null;

  return (
    <>
      {showBidHistoryModal && (
        <Modal
          show={showBidHistoryModal}
          onHide={dismissBidModalHanlder}
          dialogClassName="modal-90w"
        >
          <Modal.Header closeButton className={classes.modalHeader}>
            <div className={classes.modalHeaderNounImgWrapper}>
              <StandaloneNoun nounId={auction && auction.nounId} />
            </div>
            <Modal.Title className={classes.modalTitleWrapper}>{bidHistoryTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <BidHistory auctionId={auction.nounId.toString()} max={9999} />
          </Modal.Body>
        </Modal>
      )}

      <AuctionActivityWrapper>
        <div className={classes.informationRow}>
            <Row> 
                <Col sm={2}>
                  {displayGraphDepComps && (
                      <AuctionNavigation
                        isFirstAuction={isFirstAuction}
                        isLastAuction={isLastAuction}
                        startTime={auction.startTime}
                        onNextAuctionClick={onNextAuctionClick}
                        onPrevAuctionClick={onPrevAuctionClick}
                      />
                    )
                    }
                </Col>
                <Col className={classes.hideOnMobile}>
                  <AuctionActivityDateHeadline startTime={auction.startTime} />
                </Col>
                </Row>
            <Row>
              <AuctionTitleAndNavWrapper>
                <AuctionActivityNounTitle nounId={auction.nounId} />
              </AuctionTitleAndNavWrapper>
            </Row>

            
          <Row className={classes.activityRow}>
              <Row className={classes.hideOnDesktop}>
                <Col style={{
                  fontFamily: 'PT Root UI Bold',
                  fontSize: '18px',
                  color: '#79809C'
                }}>
                    Current Bid
                </Col>
                <Col style={{
                  fontFamily: 'PT Root UI Bold',
                  fontSize: '23px',
                  textAlign: 'right'
                }}>
                  <TruncatedAmount amount={ auction && new BigNumber(auction.amount.toString())} />
                </Col>
              </Row>
              <Row className={classes.hideOnDesktop}>
                  <Col style={{
                  fontFamily: 'PT Root UI Bold',
                  fontSize: '18px',
                  color: '#79809C'
                }}>
                  { auctionEnded ? winnerCopy : timeLeftCopy }
                </Col>
                <Col> 
                {auctionEnded ? (
                  <Winner winner={auction.bidder} />
                ) : (
                    <AuctionTimer auction={auction} auctionEnded={auctionEnded} isMobileView={true}/>
                )}
                </Col>

              </Row>


            <Col lg={3} className={`${classes.currentBidCol} ${classes.hideOnMobile}`}>
              <CurrentBid
                currentBid={new BigNumber(auction.amount.toString())}
                auctionEnded={auctionEnded}
              />
            </Col>
            <Col lg={5} className={` ${classes.auctionTimerCol} ${classes.hideOnMobile}`}>
              {auctionEnded ? (
                <Winner winner={auction.bidder} />
              ) : (
                <AuctionTimer auction={auction} auctionEnded={auctionEnded} isMobileView={false} />
              )}
            </Col>
          </Row>

          {
            !isLastAuction && (
            <NounInfoCard nounId={auction.nounId.toNumber()} />
            )
          }
        </div>

        <div className={classes.auctionInfoContainer}>  
         {isLastAuction && (
           <>
          <Row className={classes.activityRow}>
            <Col lg={9}>
              <Bid auction={auction} auctionEnded={auctionEnded} />
            </Col>
          </Row>
          <Row className={classes.activityRow}>
          <Col lg={9}>
            {displayGraphDepComps && (
              <BidHistory
                auctionId={auction.nounId.toString()}
                max={3}
                classes={bidHistoryClasses}
              />
            )}
            {!auction.amount.eq(0) &&
              (displayGraphDepComps ? (
                <BidHistoryBtn onClick={showBidModalHandler} />
              ) : (
                <BidHistoryBtn onClick={openEtherscanBidHistory} />
              ))}
          </Col>
        </Row> 
        </>
        )} 
        </div>  
      </AuctionActivityWrapper>
    </>
  );
};

export default AuctionActivity;
