import classes from './BidHistoryBtn.module.css';

const BidHistoryBtn: React.FC<{ onClick: () => void }> = props => {
  const { onClick } = props;
  return (
    <div className={classes.bidHistoryWrapper} onClick={onClick}>
      <div className={classes.bidHistory}>View all bids</div>
    </div>
  );
};
export default BidHistoryBtn;
