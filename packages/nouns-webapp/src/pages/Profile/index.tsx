import { Col } from 'react-bootstrap';
import Section from '../../layout/Section';
// import { useAllProposals } from '../../wrappers/nounsDao';
// import Proposals from '../../components/Proposals';
import classes from './Profile.module.css';

interface ProfilePageProps {
  nounId?: number;
}

const ProfilePage: React.FC<ProfilePageProps> = props => {
  const { nounId } = props
  // const { data: proposals } = useAllProposals();

  return (
    <Section bgColor="transparent" fullWidth={true}>
      <Col lg={{ span: 8, offset: 2 }}>
        <h1 className={classes.heading}>Nouns {nounId}</h1>
      </Col>
    </Section>
  );
};
export default ProfilePage;
