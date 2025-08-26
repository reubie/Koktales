import { TextStyle } from 'react-native';

export const Fonts: {
  headline: TextStyle;
  headline2: TextStyle;
  headline3: TextStyle;
  body1: TextStyle;
  body2: TextStyle;
  body3: TextStyle;
  body4: TextStyle;
  body5: TextStyle;
  button: TextStyle;
  caption: TextStyle;
} = {
  headline: {
    fontFamily: 'Roboto-Bold',
    fontSize: 36,
    lineHeight: 40, // 110% of 36
    letterSpacing: -1.62, // -4.5% of 36
  },
  headline2: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    lineHeight: 23, // 96% of 24
    letterSpacing: -1.08, // -4.5% of 24
  },
  headline3: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
    lineHeight: 24, // 120% of 20
    letterSpacing: -0.7, // -3.5% of 20
  },
  body1: {
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19, // 120% of 16
    letterSpacing: -0.24, // -1.5% of 16
  },
  body2: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19, // 120% of 16
    letterSpacing: -0.48, // -3% of 16
  },
  body3: {
    fontFamily: 'Roboto',
    fontSize: 13,
    lineHeight: 16, // 120% of 13
    letterSpacing: -0.39, // -3% of 13
  },
  body4: {
    fontFamily: 'Roboto-Medium',
    fontSize: 13,
    lineHeight: 16, // 120% of 13
    letterSpacing: -0.39, // -3% of 13
  },
  body5: {
    fontFamily: 'Roboto',
    fontSize: 10,
    lineHeight: undefined, // auto
    letterSpacing: 0, // 0%
  },
  button: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 19, // 120% of 16
    letterSpacing: -0.24, // -1.5% of 16
  },
  caption: {
    fontFamily: 'Roboto',
    fontSize: 13,
    lineHeight: 16, // 120% of 13
    letterSpacing: -0.39, // -3% of 13
  }
};

export default Fonts;