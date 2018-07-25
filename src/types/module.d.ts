declare interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
  values(target: any, ...sources: any[]): any;
}

declare module 'react-helmet';
declare module 'quran-components/lib/Tabs';
declare module 'quran-components/lib/Loader';
declare module 'react-scroll/lib/components/Element';
declare module 'react-cookie';
declare module 'react-share';
declare module 'react-tippy';
declare module 'copy-to-clipboard';
declare module 'react-async-bootstrapper';
declare module 'i';
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
// eslint-disable-next-line
declare const __CLIENT__: string;
// eslint-disable-next-line
declare const __SERVER__: string;
// eslint-disable-next-line
declare const __DEVELOPMENT__: string;
// eslint-disable-next-line
declare const __DEVTOOLS__: string;
