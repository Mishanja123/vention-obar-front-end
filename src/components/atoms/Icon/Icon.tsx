import React from 'react';
import { icons } from '../../../assets/icons';

interface IconProps {
  iconName: string;
}

const Icon: React.FC<IconProps> = ({ iconName }) => {
  //@ts-expect-error
  const IconComponent = icons[iconName];

  if (!IconComponent) {
    console.error(`Icon ${iconName} not found`);
    return null;
  }
  return <IconComponent />;
};

export default Icon;
