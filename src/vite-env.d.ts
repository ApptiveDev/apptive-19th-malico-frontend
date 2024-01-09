// <reference types="vite/client" />

import 'vite/client';
declare module '*.svg' {
  const content: string;
  export default content;
}
declare module '*.png';
