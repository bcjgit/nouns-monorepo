import { ImageData as data, getNounData } from '@nouns/assets';
import { buildSVG } from '@nouns/sdk';
import { BigNumber as EthersBN } from 'ethers';
import { INounSeed, useNounSeed } from '../../wrappers/nounToken';
import Noun from '../Noun';
import { Link, useHistory } from 'react-router-dom';
import classes from './StandaloneNoun.module.css';
import { useDispatch } from 'react-redux';
import { setOnDisplayAuctionNounId } from '../../state/slices/onDisplayAuction';

interface StandaloneNounProps {
  nounId: EthersBN;
}

interface StandaloneNounWithSeedProps {
  nounId: EthersBN;
  onLoadSeed?: (seed: INounSeed) => void;
  shouldLinkToProfile: boolean;
}

const getNoun = (nounId: string | EthersBN, seed: INounSeed) => {
  const id = nounId.toString();
  const name = `Noun ${id}`;
  const description = `Noun ${id} is a member of the Nouns DAO`;
  const { parts, background } = getNounData(seed);
  const image = `data:image/svg+xml;base64,${btoa(buildSVG(parts, data.palette, background))}`;

  return {
    name,
    description,
    image,
  };
};

const StandaloneNoun: React.FC<StandaloneNounProps> = (props: StandaloneNounProps) => {
  const { nounId } = props;
  const seed = useNounSeed(nounId);
  const noun = seed && getNoun(nounId, seed);
  const history = useHistory();
  const dispatch = useDispatch();


  const linkClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
    history.push(`/auction/${nounId}`);
  };

  return (
    <Link to={'/auction/' + nounId.toString()} className={classes.clickableNoun} onClick={linkClickHandler}>
      <Noun imgPath={noun ? noun.image : ''} alt={noun ? noun.description : 'Noun'} />
    </Link>
  );
};

export const StandaloneNounWithSeed: React.FC<StandaloneNounWithSeedProps> = (
  props: StandaloneNounWithSeedProps,
) => {
  const { nounId, onLoadSeed, shouldLinkToProfile } = props;
  const history = useHistory();
  const dispatch = useDispatch();


  const linkClickHandler = () => {
    dispatch(setOnDisplayAuctionNounId(nounId.toNumber()));
    history.push(`/auction/${nounId}`);
  };

  const seed = useNounSeed(nounId);

  if (!seed || !nounId || !onLoadSeed) return <Noun imgPath="" alt="Noun" />;

  onLoadSeed(seed);

  const { image, description } = getNoun(nounId, seed);

  const noun = <Noun imgPath={image} alt={description} />;
  const nounWithLink = (
    <Link to={'/auction/' + nounId.toString()} className={classes.clickableNoun} onClick={linkClickHandler}>
      {noun}
    </Link>
  );
  return shouldLinkToProfile ? nounWithLink : noun;
};

export default StandaloneNoun;
