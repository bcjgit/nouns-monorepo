import { Row } from 'react-bootstrap';
import StandaloneNoun, { StandaloneNounCircleImg } from '../../components/StandaloneNoun';
import classes from './NounProfileCard.module.css';
import { BigNumber } from 'ethers';
import React from 'react';
import ShortAddress from '../ShortAddress';

interface NounProfileCardProps {
    nounId: number;
    nounOwnerAddress: string;
}

const NounProfileCard: React.FC<NounProfileCardProps> = props => {
    const { nounId , nounOwnerAddress} = props;

    const nounStartDate = new Date('August 8, 2021');

    const nounBirthday = nounStartDate.setDate(nounStartDate.getDate() + nounId);
    return (
        <div>
            <Row>
               <StandaloneNounCircleImg nounId={BigNumber.from(nounId)} isCircle={true}/>
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
            <h2 className={classes.subHeading}>
                <ShortAddress address={nounOwnerAddress} />
            </h2>
            </Row>
        </div>
    )
}

export default NounProfileCard;