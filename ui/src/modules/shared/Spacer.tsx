import React from 'react';
import { type SpacerProps } from 'types/frontend';

const Spacer: React.FC<SpacerProps> = ({ ...props }) => {
  const { top, bottom, left, right } = { ...props };
  return <div {...props} style={{ marginTop: top, marginBottom: bottom, marginLeft: left, marginRight: right }} />;
};

export default Spacer;
