import { config } from '@tamagui/config';
import { createTamagui, createFont } from 'tamagui';

const bodyFont = createFont({
  ...config.fonts.body,
  size: { ...config.fonts.body.size, true: config.fonts.body.size[4] },
  lineHeight: { ...config.fonts.body.lineHeight, true: config.fonts.body.lineHeight[4] },
  weight: { ...config.fonts.body.weight, true: config.fonts.body.weight[4] },
  letterSpacing: { ...config.fonts.body.letterSpacing, true: config.fonts.body.letterSpacing[4] },
});

const headingFont = createFont({
  ...config.fonts.heading,
  size: { ...config.fonts.heading.size, true: config.fonts.heading.size[6] },
  lineHeight: { ...config.fonts.heading.lineHeight, true: config.fonts.heading.lineHeight[6] },
  weight: { ...config.fonts.heading.weight, true: config.fonts.heading.weight[6] },
  letterSpacing: {
    ...config.fonts.heading.letterSpacing,
    true: config.fonts.heading.letterSpacing[6],
  },
});

const tamaguiConfig = createTamagui({
  ...config,
  defaultFont: 'body',
  fonts: {
    ...config.fonts,
    body: bodyFont,
    heading: headingFont,
  },
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
