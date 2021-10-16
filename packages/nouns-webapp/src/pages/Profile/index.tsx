import { BigNumber } from "@ethersproject/bignumber";
import React from "react";
import { Col, Container, Row , Image, Button} from "react-bootstrap";
import Documentation from "../../components/Documentation"
import StandaloneNoun from "../../components/StandaloneNoun";
import classes from './Profile.module.css';

import _AddressIcon from '../../assets/icons/Address.svg';
import _BirthdayIcon from '../../assets/icons/Birthday.svg';
import _HeartIcon from '../../assets/icons/Heart.svg';
import _ClockIcon from '../../assets/icons/Clock.svg';
import _LinkIcon from '../../assets/icons/Link.svg';
import _BidsIcon from '../../assets/icons/Bids.svg';
import ProfileActivityFeed from "../../components/ProfileActivityFeed";

interface ProfilePageProps {
    nounId: number;
}

const ProfilePage: React.FC<ProfilePageProps> = props => {
    const { nounId } = props;

    const nounContent = (
        <div className={classes.nounWrapper}>
          <StandaloneNoun nounId={BigNumber.from(nounId)} />
        </div>
     );

    return (
        <>
         <Container fluid="lg">
            <Row>
                <Col lg={{ span: 6 }} className={classes.nounContentCol}>
                    {nounContent}
                </Col>
                <Col lg={{ span: 6 }} className={classes.auctionActivityCol}>
                    <Row>
                        <div className={classes.wrapper}>
                            <h3 style={{
                                marginBottom: '0px'
                            }}>Profile</h3>
                            <h2>Noun {nounId}</h2>
                        </div>
                    </Row>
                    {/* Noun info card */}
                    <div className={classes.nounInfo}>
                        <Row className={classes.nounInfoPadding}> 
                            <Image src={_BirthdayIcon} style={{
                                paddingRight: 5 
                            }}/>  Born <div style={{
                                paddingLeft: 4,
                                fontFamily: 'PT Root UI Bold'
                            }}>October 1, 2021</div>
                        </Row>
                        <Row className={classes.nounInfoPadding}> 
                            <Image src={_HeartIcon} style={{
                                paddingRight: 5 
                            }}/>  Held by <strong style={{
                                paddingLeft: 4,
                                fontWeight: 'bold'
                            }}><a style={{
                                color: '#4965F0'
                            }}href="#">coralorca.eth</a></strong>
                            <Image src={_LinkIcon} style = {{
                                paddingLeft: 5
                            }}/>
                        </Row>
                        {/* <Row className={classes.nounInfoPadding}> 
                            <Image src={_ClockIcon} style={{
                                paddingRight: 5 
                            }}/>  Last seen <strong style={{
                                paddingLeft: 4
                            }}>today </strong>
                        </Row> */}
                       <Row className={classes.nounInfoPadding}>
                            <Button variant='light' style={{
                                fontFamily: 'PT Root UI Bold',
                                backgroundColor: '#E9EBF3',
                                border: '0px',
                                borderRadius: '10px',
                                marginRight: '10px',
                                marginTop: '5px',
                                marginBottom: '5px'
                            }}>
                                <Image src={_BidsIcon} style = {{
                                    paddingRight: 5
                                }}/>
                                Bids
                            </Button>

                            <Button variant='light' style={{
                                fontFamily: 'PT Root UI Bold',
                                backgroundColor: '#E9EBF3',
                                border: '0px',
                                borderRadius: '10px',
                                marginRight: '5px',
                                marginTop: '5px',
                                marginBottom: '5px'
                            }}>
                                <Image src={_AddressIcon} style = {{
                                    paddingRight: 5
                                }}/>
                                Etherscan
                            </Button>
                        </Row>

                    </div>
                </Col>
            </Row>
            </Container>
           {/* <Documentation/> */}
           <ProfileActivityFeed nounId = {nounId} />
        </>
    );
};

export default ProfilePage;