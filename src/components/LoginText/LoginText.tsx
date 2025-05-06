import { Typography } from 'antd';
import { LoginTextProps } from '../../types';
import './LoginText.css';

const LoginText: React.FC<LoginTextProps> = ({ heading, text }) => {
  return (
    <div className="text-container">
      <Typography.Title copyable={false} level={2} className="title">
        {heading}
      </Typography.Title>
      <Typography.Text copyable={false} className="text">
        {text}
      </Typography.Text>
    </div>
  );
};

export default LoginText;
