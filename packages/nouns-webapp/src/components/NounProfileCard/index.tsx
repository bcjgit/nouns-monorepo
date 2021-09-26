import { Row } from 'react-bootstrap';
import StandaloneNoun from '../../components/StandaloneNoun';
import classes from './NounProfileCard.module.css';
import { BigNumber } from 'ethers';
import { nounQuery } from '../../wrappers/subgraph';
import { useQuery } from '@apollo/client';
import { useReverseENSLookUp } from '../../utils/ensLookup';
import React from 'react';
import ShortAddress from '../ShortAddress';

interface NounProfileCardProps {
    nounId?: number;
}

const NounProfileCard: React.FC<NounProfileCardProps> = props => {
    const { nounId } = props;

    // TODO confirm that this is the best way to do this ... look how they did it in Auction
    var nounIdToString = "";
    if (nounId) {
        nounIdToString = nounId.toString();
    }
    const nounStartDate = new Date('August 8, 2021');
    const { loading, error, data } = useQuery(nounQuery(nounIdToString));

    if (!nounId || loading || error) {
        return (
            <div>
                Failed to load noun info
            </div>
        );
    }

    // TODO
    console.log(data);

    const nounBirthday = nounStartDate.setDate(nounStartDate.getDate() + nounId);
    // TODO get data with GQL here
    return (
        <div>
            <Row>
               <StandaloneNoun nounId={BigNumber.from(nounId)}/>
            </Row>
            <Row>
              <h1 className={classes.heading}>Noun {nounId}</h1>
            </Row>
            <Row>
              <h2 className={classes.birthday}>{new Date(nounBirthday).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})}</h2>
            </Row>
            <Row>
            <p style={{fontWeight: 'bold'}}>Operated By</p>
            </Row>
            <Row>
            <h2 className={classes.subHeading}>
                <ShortAddress address={data && data.noun.owner.id} />
            </h2>
            </Row>
        </div>
    )
}

export default NounProfileCard;