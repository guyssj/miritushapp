import { bnAccent, bnAccentDark, bnError, bnErrorDark, bnGray, bnGrayDark, bnPrimary, bnPrimaryDark, bnSecondary, bnSecondaryDark, bnSuccess, bnSuccessDark, bnWarning, bnWarningDark } from "./appTheme";



export type ColorTheme = {
    primary: any;
    secondary: any;
    accent: any;
    success: any;
    warning: any;
    error: any;
    gray: any;
    textPrimary: string;
    textSecondary: string;
};

const sharedColors = {
    black: '#000000',
    white: '#FFFFFF',
    backgroundPrimary: '#FAFAFA',
    backgroundTransparent: 'transparent'
};

type SharedColors = typeof sharedColors;

export type TColors = ColorTheme & SharedColors;


type ColorPalettes = {
    light: TColors;
    dark: TColors;
};

const Colors: ColorPalettes = {
    light: {
        primary: {
            main: bnPrimary[500],
            ...bnPrimary,
        },
        secondary: {
            main: bnSecondary[500],
            ...bnSecondary,
        },
        accent: {
            ...bnAccent,
        },
        success: {
            ...bnSuccess,
        },
        warning: {
            ...bnWarning,
        },
        error: {
            ...bnError,
        },
        gray: {
            ...bnGray,
        },
        textPrimary: bnPrimary[900],
        textSecondary: bnSecondary[500],
        ...sharedColors,
    },

    dark: {
        primary: {
            main: bnPrimaryDark[500],
            ...bnPrimaryDark,
        },
        secondary: {
            main: bnSecondaryDark[500],
            ...bnSecondaryDark,
        },
        accent: {
            ...bnAccentDark,
        },
        success: {
            ...bnSuccessDark,
        },
        warning: {
            ...bnWarningDark,
        },
        error: {
            ...bnErrorDark,
        },
        gray: {
            ...bnGrayDark,
        },
        textPrimary: bnSecondaryDark[700],
        textSecondary: bnSecondaryDark[300],
        ...sharedColors,
    },
};



export default Colors;