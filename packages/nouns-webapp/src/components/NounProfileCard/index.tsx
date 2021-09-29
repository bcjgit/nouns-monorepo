import { Row } from 'react-bootstrap';
import { StandaloneNounCircleImg } from '../../components/StandaloneNoun';
import classes from './NounProfileCard.module.css';
import { BigNumber } from 'ethers';
import React from 'react';
import ShortAddress from '../ShortAddress';

interface NounProfileCardProps {
    nounId?: number;
}

const NounProfileCard: React.FC<NounProfileCardProps> = props => {
    const { nounId } = props;

    if (!nounId) {
        return (
            <div>
                No noun id provided
            </div>
        );
    }

    // TODO replace this with gql class and or useDapp
    const nounStartDate = new Date('August 8, 2021');

    const nounBirthday = nounStartDate.setDate(nounStartDate.getDate() + nounId);
    return (
        <div>
            <Row>
               <StandaloneNounCircleImg nounId={BigNumber.from(nounId)}/>
            </Row>
            <Row>
              <h1 className={classes.heading}>Noun {nounId}</h1>
            </Row>
            <Row>
              <h2 className={classes.birthday}>{new Date(nounBirthday).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})}</h2>
            </Row>
            <Row>
            <p style={{fontWeight: 'bold'}}>Current Caretaker:</p>
            </Row>
            <Row>
            {/* <h2 className={classes.subHeading}>
                <ShortAddress address={nounOwnerAddress} />
            </h2> */}
            </Row>
        </div>
    )
}

export default NounProfileCard;