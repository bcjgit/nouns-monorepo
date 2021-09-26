import { Row } from 'react-bootstrap';
import StandaloneNoun from '../../components/StandaloneNoun';
import classes from './NounProfileCard.module.css';
import { BigNumber } from 'ethers';

interface NounProfileCardProps {
    nounId?: number;
}

const NounProfileCard: React.FC<NounProfileCardProps> = props => {
    const { nounId } = props;

    var nounStartDate = new Date('August 8, 2021');

    if (!nounId) {
        return (
            <div>
                Failed to load noun info
            </div>
        );
    }

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
            <h2 className={classes.subHeading}>dragonfly.eth</h2>
            </Row>
        </div>
    )
}

export default NounProfileCard;