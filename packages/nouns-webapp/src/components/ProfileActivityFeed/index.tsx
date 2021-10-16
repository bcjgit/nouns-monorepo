import React from "react";
import { Col, Container, Row , Image, Button, Table} from "react-bootstrap";
import Section from "../../layout/Section";
import classes from './ProfileActivityFeed.module.css';


import _YesVoteIcon from '../../assets/icons/YesVote.svg';
import _NoVoteIcon from '../../assets/icons/NoVote.svg';
import _AbsentVoteIcon from '../../assets/icons/AbsentVote.svg';

import _VotePassedIcon from '../../assets/icons/VotePassed.svg';
import _VoteFailedIcon from '../../assets/icons/VoteFailed.svg';

interface ProfileActivityFeedProps {
    nounId: number;
}

const ProfileActivityFeed: React.FC<ProfileActivityFeedProps> = props => {

    const { nounId } = props;

    return (
        <Section bgColor="white" fullWidth={false}>
            <Col lg={{ span: 10, offset: 1 }}>
            <div className={classes.headerWrapper}>
                    <h1 style={{
                        paddingBottom: '16px'
                    }}>Activity</h1>
            </div>

            <Table responsive hover>
                <tbody className={classes.nounInfoPadding}>
                    <tr>
                        <td>
                            <Image src={_YesVoteIcon} style={{
                                marginRight: '10px',
                                // marginBottom: '5px'
                            }} />  Voted for <strong>Noun Bidder POAP</strong>
                        </td>
                        <td style={{
                            textAlign: 'right'
                        }}>
                            <Image src={_VotePassedIcon} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Image src={_NoVoteIcon} style = {{
                                marginRight: '10px'
                            }}/> 
                            Voted aginst <strong>Take Down Nounds!</strong>
                        </td>
                        <td style={{
                            textAlign: 'right'
                        }}>
                            <Image src={_VoteFailedIcon} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Image src={_AbsentVoteIcon} style = {{
                                marginRight: '10px'
                            }}/> 
                            Absent for <strong>Nouns FOMO</strong>
                        </td>
                        <td style={{
                            textAlign: 'right'
                        }}>
                            <Image src={_VotePassedIcon} />
                        </td>
                    </tr>
                </tbody>
                </Table>


                {/* <Row>
                    <div className={classes.headerWrapper}>
                        <h1>Activity</h1>
                    </div>
                    <hr/>
                </Row>
                <Row>
                    <div style={{
                        float: 'left', 
                        display: 'inline-block'
                    }}>
                        <Image src={_YesVoteIcon} />
                        This is a test
                    </div>
                </Row> */}

                {/* <div className={classes.headerWrapper}>
                    <h1>Activity</h1>
                    <hr/>
                    <div style={{
                        float: 'left', 
                        display: 'inline-block'
                    }}>
                        <Image src={_YesVoteIcon} />
                    </div>
                    <hr/>
                    <Image src={_NoVoteIcon} />
                    <hr/>
                    <Image src={_AbsentVoteIcon} />
                </div> */}
            </Col>
        </Section>
    );
}

export default ProfileActivityFeed;