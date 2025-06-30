import { config } from '@tamagui/config/v3';
import { createTamagui } from 'tamagui';

const tamaguiConfig = createTamagui({
  ...config,
  media: {
    xs: { maxWidth: 750 },
    sm: { minWidth: 751, maxWidth: 930 },
    md: { minWidth: 931, maxWidth: 1050 },
    lg: { minWidth: 1051, maxWidth: 2500 },
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module 'tamagui' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}
