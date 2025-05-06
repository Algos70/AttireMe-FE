import { Typography } from 'antd';
import './PrivacyPolicyWarningText.css';
const WarningText: React.FC = () => {
  return (
    <Typography.Text color="#8c8273" copyable={false} className="warning-text">
      By signing up, you are creating a AttireMe account and agree to AttireMe's Terms and Privacy Policy
    </Typography.Text>
  );
};

export default WarningText;
