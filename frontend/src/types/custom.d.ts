// C:\Apps\Anto\brisa\frontend\src\types\custom.d.ts

declare module '*.svg' {
import * as React from 'react';

export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

// For default export as URL
const src: string;
export default src;
}