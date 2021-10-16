import { BigNumber } from "@ethersproject/bignumber";
import StandaloneNoun from "../StandaloneNoun";

interface NounProfileBannerProps {
    nounId: number;
}

const NounProfileBanner: React.FC<NounProfileBannerProps> = props => {

    const { nounId } = props;

    return (
        <>
            <div style={{
                height: 512,
                width: 512,
                paddingLeft: 20,
                paddingBottom: 0
            }}>
                <StandaloneNoun nounId={BigNumber.from(nounId)} />
            </div>
        </>
    );

}

export default NounProfileBanner;
