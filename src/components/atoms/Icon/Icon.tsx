import React from 'react';
import { icons } from '../../../assets/icons';

interface IconProps {
  iconName: keyof typeof icons;
}

const Icon: React.FC<IconProps> = ({ iconName }) => {
  const IconComponent = icons[iconName];

  if (!IconComponent) {
    console.error(`Icon ${iconName} not found`);
    return null;
  }
  return <IconComponent />;
};

export default Icon;
