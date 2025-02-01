import { Row, Col } from 'antd';
import LoginText from '../../components/LoginText/LoginText';
import LoginMail from '../../components/LoginMail/LoginMail';
import './Login.css';

function Login() {
  return (
    <Row gutter={32} className="login-container">
      <Col xs={24} md={16} className="left-container">
        <LoginText heading="Start your fashion journey on AttireMe" text="Join our community of dashing individuals and build yourself a fashionable future together!"></LoginText>
        <LoginMail></LoginMail>
      </Col>
      <Col xs={24} md={8} className="right-container"></Col>
    </Row>
  );
}

export default Login;
