declare module '*.css';
declare module '*.scss' {
  type IClassNames = Record<string, string>;
  const classNames: IClassNames;
  export = classNames;
}
// declare module '*.scss'
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg' {
  import type React from 'react';
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

// declare const platform: 'mobile' | 'desktop';
// declare const environment: 'production' | 'development';
