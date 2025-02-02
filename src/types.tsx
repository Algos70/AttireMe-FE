import Icon from '@ant-design/icons';
import { GetProps } from 'antd';

export interface LoginTextProps {
  heading: string;
  text: string;
}

export type LoginMailType = {
  mail?: string;
};

export type LoginCardProps = {
  image: string;
};

export type CustomIconComponentProps = GetProps<typeof Icon>;
