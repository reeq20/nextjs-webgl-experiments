/* eslint-disable  */
declare module "*.css" {
  type ClassNames = {
    [className: string]: string;
  };
  const className: ClassNames;
  export = className;
}

declare module "*.scss";

declare module "*.glsl" {
  const src: string;
  export default src;
}
