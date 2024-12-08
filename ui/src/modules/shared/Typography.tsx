import React from 'react';

type TypographyVariants = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface TypographyProps {
  variant: TypographyVariants;
  text?: string;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({ variant, className, text, ...props }) => {
  const TypographyComponent = variant;
  return (
    <TypographyComponent {...props} className={className}>
      {text}
    </TypographyComponent>
  );
};

export default Typography;
