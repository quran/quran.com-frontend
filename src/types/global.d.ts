type $TsFixMe = any;

interface Window {
  clearCookies: any;
  ReactDOM: any;
  store: any;
  __REDUX_DATA__: any;
  __ASYNC_COMPONENTS_REHYDRATE_STATE__: any;
  Raven: any;
  mixpanel: any;
  ga: any;
}

type ArgumentTypes<T extends (...args: any[]) => any> = T extends (
  ...args: infer U
) => any
  ? U
  : never;

type ReplaceReturnType<T extends (...args: any[]) => any, TNewReturn> = (
  ...a: ArgumentTypes<T>
) => TNewReturn;

type PackType<T extends (...args: any[]) => any> = ReplaceReturnType<
  T,
  ReturnType<T>['promise']
>;
