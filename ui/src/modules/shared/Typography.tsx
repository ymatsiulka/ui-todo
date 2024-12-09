import React from 'react';

type TypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TypographyProps {
  variant: TypographyVariants;
  children?: React.ReactNode;
  className?: string;
  text?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant, children, className, text, ...props }) => {
  const TypographyComponent = variant;
  return (
    <TypographyComponent {...props} className={className}>
      {text ?? children}
    </TypographyComponent>
  );
};

export default Typography;
