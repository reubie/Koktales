import { TextStyle } from 'react-native';

export const Fonts: {
  heading: TextStyle;
  subheading: TextStyle;
  body: TextStyle;
  button: TextStyle;
  caption: TextStyle;
} = {
  heading: {
    fontFamily: 'Montserrat-Bold',
    fontWeight: '700',
  },
  subheading: {
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '600',
  },
  body: {
    fontFamily: 'Manrope-Regular',
    fontWeight: '400',
  },
  button: {
    fontFamily: 'Manrope-SemiBold',
    fontWeight: '600',
  },
  caption: {
    fontFamily: 'Manrope-Medium',
    fontWeight: '500',
  }
};

export default Fonts;