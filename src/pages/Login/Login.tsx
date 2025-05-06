import { Row, Col } from 'antd';
import LoginText from '../../components/LoginText/LoginText';
import LoginMail from '../../components/LoginMail/LoginMail';
import './Login.css';
import LoginMailLogo from '../../components/LoginMailLogo/LoginMailLogo';
import WarningText from '../../components/PrivacyPolicyWarningText/PrivacyPolicyWarningText';

const Login: React.FC = () => {
  return (
    <Row className="login-container">
      <Col span={24} className="left-container">
        <LoginMailLogo />
        <LoginText heading="Log in" text="Enter credentials to log in" />
        <LoginMail />
        <WarningText />
      </Col>
    </Row>
  );
};

export default Login;
