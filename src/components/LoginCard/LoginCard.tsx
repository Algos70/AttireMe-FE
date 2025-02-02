import './LoginCard.css';
import { Button, Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { LoginCardProps } from '../../types';

const LoginCard: React.FC<LoginCardProps> = ({ image }) => {
  return (
    <Card className="card" cover={<img alt="Fashionable Women" src={image} className="card-image" />}>
      <Meta title="Tailored for you dreams"></Meta>
      <Button className="card-button">Join Now</Button>
    </Card>
  );
};

export default LoginCard;
