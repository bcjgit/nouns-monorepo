import classes from './BidHistoryBtn.module.css';

const BidHistoryBtn: React.FC<{ onClick: () => void }> = props => {
  const { onClick } = props;
  return (
    <div className={classes.bidHistoryWrapper} onClick={onClick}>
      <div className={classes.bidHistory}>View bid history</div>
    </div>
  );
};
export default BidHistoryBtn;
