import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const scale = (size) => (width / 375) * size; // 375 = iPhone X base width

export const typography = {
    h1: {
        fontSize: scale(32),
        fontWeight: '700',
        fontFamily: 'NotoSansHebrew-Bold',
        lineHeight: scale(40),
        letterSpacing: 0.5,
    },
    h2: {
        fontSize: scale(28),
        fontWeight: '700',
        fontFamily: 'NotoSansHebrew-Bold',
        lineHeight: scale(36),
        letterSpacing: 0.4,
    },
    h3: {
        fontSize: scale(24),
        fontWeight: '600',
        fontFamily: 'NotoSansHebrew-SemiBold',
        lineHeight: scale(32),
        letterSpacing: 0.3,
    },
    h4: {
        fontSize: scale(20),
        fontWeight: '600',
        fontFamily: 'NotoSansHebrew-SemiBold',
        lineHeight: scale(28),
        letterSpacing: 0.25,
    },
    body: {
        fontSize: scale(16),
        fontWeight: '400',
        fontFamily: 'NotoSansHebrew-Regular',
        lineHeight: scale(24),
        letterSpacing: 0.2,
    },
    caption: {
        fontSize: scale(12),
        fontWeight: '300',
        fontFamily: 'NotoSansHebrew-Light',
        lineHeight: scale(16),
        letterSpacing: 0.1,
    },
    subtitle: {
        fontSize: scale(20),
        fontWeight: '300',
        fontFamily: 'NotoSansHebrew-Light',
        lineHeight: scale(20),
        letterSpacing: 0.1,
    }
};