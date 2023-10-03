declare module '*.svg' {
  import {FC} from 'react';
  import {SvgProps} from 'react-native-svg';

  const importSvg: FC<SvgProps>;
  export default importSvg;
}
