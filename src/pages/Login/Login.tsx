import { Row, Col, Button } from 'antd';
import LoginText from '../../components/LoginText/LoginText';
import LoginMail from '../../components/LoginMail/LoginMail';
import './Login.css';
import LoginMailLogo from '../../components/LoginMailLogo/LoginMailLogo';
import WarningText from '../../components/PrivacyPolicyWarningText/PrivacyPolicyWarningText';
import LoginCard from '../../components/LoginCard/LoginCard';
import woman from '/img/woman.svg';
import woman2 from '/img/woman2.svg';

const Login: React.FC = () => {
  return (
    <Row className="login-container">
      <LoginMailLogo />
      <Col xs={24} md={16} className="left-container">
        <LoginText heading="Start a journey on AttireMe" text="Join our community of dashing individuals and build yourself a fashionable future together!"></LoginText>
        <LoginMail></LoginMail>
        <WarningText></WarningText>
        <Button className="join" type="dashed">
          Not a fan? Join as a creator
        </Button>
      </Col>
      <Col xs={24} md={8} className="right-container">
        <div className="card-container">
          <LoginCard image={woman} />
          <LoginCard image={woman2} />
        </div>
      </Col>
    </Row>
  );
};

export default Login;
