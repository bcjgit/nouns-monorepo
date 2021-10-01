import { useQuery } from "@apollo/client";
import { auctionQuery } from "../../wrappers/subgraph";
import classes from './NounProfileCardBirthday.module.css';
import React from 'react';

interface NounProfileCardBirthdayProps {
    nounId: number;
}

const NounProfileCardBirthday: React.FC<NounProfileCardBirthdayProps> = props => {
    const { nounId} = props;

    const {loading, error, data} = useQuery(auctionQuery(nounId));

    if (loading) {
        return <></>;
    } else if (error) {
        return (
            <div>
                Failed to fetch noun auction info
            </div>
        )
    }

    return <h2 className={classes.birthday}>{new Date(data.auction.startTime * 1000).toLocaleDateString("en-US", {year: 'numeric', month: 'long', day: 'numeric'})}</h2>;

}


export default NounProfileCardBirthday;