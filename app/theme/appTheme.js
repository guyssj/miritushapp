import { color } from "./color"

export const bnPrimary = {
    50: '#e6ecfa',
    100: '#b6c8ef',
    200: '#88a3e2',
    300: '#5b7ed4',
    400: '#3257c4',
    500: '#1f41bb',
    600: '#1937a2',
    700: '#142e8a',
    800: '#0f2573',
    900: '#0a1c5c',
}

export const bnSecondary = {
    50: '#F0F4FF',
    100: '#D6E0FC',
    200: '#ADC2F9',
    300: '#7F9FF2',
    400: '#4A6FE8',
    500: '#3056DD', // base
    600: '#2448C4',
    700: '#1C3AAD',
}

export const bnAccent = {
    50: '#e0fbf9',
    100: '#b2f1eb',
    200: '#80e6dd',
    300: '#4cdacb',
    400: '#26cfbd',
    500: '#00c3b0', // base
    600: '#00a897',
    700: '#008f80',
    800: '#00756a',
    900: '#005d55',
}

export const bnSuccess = {
    50: '#e6f8ed',
    100: '#c1ecd2',
    200: '#95dfb3',
    300: '#67d194',
    400: '#40c67d',
    500: '#1bbb66', // base
    600: '#149e56',
    700: '#0f8147',
    800: '#096639',
    900: '#064d2d',
}

export const bnWarning = {
    50: '#fff7e5',
    100: '#ffe8b7',
    200: '#ffd885',
    300: '#ffc74f',
    400: '#ffb626',
    500: '#ffa600', // base
    600: '#db8b00',
    700: '#b77200',
    800: '#935900',
    900: '#774600',
}

export const bnError = {
    50: '#ffecec',
    100: '#ffcfcf',
    200: '#ffa8a8',
    300: '#ff7a7a',
    400: '#ff4e4e',
    500: '#ff2e2e', // base
    600: '#db2020',
    700: '#b71717',
    800: '#931010',
    900: '#770b0b',
}

export const bnGray = {
    50: '#f8f9fa',
    100: '#e9ecef',
    200: '#dee2e6',
    300: '#ced4da',
    400: '#adb5bd',
    500: '#6c757d',
    600: '#495057',
    700: '#343a40',
    800: '#212529',
    900: '#121416',
}


export const bnPrimaryDark = {
    50: '#0a1c5c',
    100: '#0f2573',
    200: '#142e8a',
    300: '#1937a2',
    400: '#1f41bb',
    500: '#3257c4',
    600: '#5b7ed4',
    700: '#88a3e2',
    800: '#b6c8ef',
    900: '#e6ecfa',
}
export const bnSecondaryDark = {
    50: '#1C3AAD',
    100: '#2448C4',
    200: '#3056DD',
    300: '#4A6FE8',
    400: '#7F9FF2',
    500: '#ADC2F9',
    600: '#D6E0FC',
    700: '#F0F4FF',
}
export const bnAccentDark = {
    50: '#005d55',
    100: '#00756a',
    200: '#008f80',
    300: '#00a897',
    400: '#00c3b0',
    500: '#26cfbd',
    600: '#4cdacb',
    700: '#80e6dd',
    800: '#b2f1eb',
    900: '#e0fbf9',
}
export const bnSuccessDark = {
    50: '#064d2d',
    100: '#096639',
    200: '#0f8147',
    300: '#149e56',
    400: '#1bbb66',
    500: '#40c67d',
    600: '#67d194',
    700: '#95dfb3',
    800: '#c1ecd2',
    900: '#e6f8ed',
}
export const bnWarningDark = {
    50: '#774600',
    100: '#935900',
    200: '#b77200',
    300: '#db8b00',
    400: '#ffa600',
    500: '#ffb626',
    600: '#ffc74f',
    700: '#ffd885',
    800: '#ffe8b7',
    900: '#fff7e5',
}
export const bnErrorDark = {
    50: '#770b0b',
    100: '#931010',
    200: '#b71717',
    300: '#db2020',
    400: '#ff2e2e',
    500: '#ff4e4e',
    600: '#ff7a7a',
    700: '#ffa8a8',
    800: '#ffcfcf',
    900: '#ffecec',
}
export const bnGrayDark = {
    50: '#121416',
    100: '#212529',
    200: '#343a40',
    300: '#495057',
    400: '#6c757d',
    500: '#adb5bd',
    600: '#ced4da',
    700: '#dee2e6',
    800: '#e9ecef',
    900: '#f8f9fa',
}


const appTheme = {
    palette: {
        primary: {
            main: bnPrimary[500],
            contrastText: "#fff",
            dark: "#040816",
            light: "#e9edfb",
        },
        secondary: {
            main: "#95a5a6",
            contrastText: "#fff",
            light: '#ac9076',
            dark: "#6a513a",
            50: '#f2f3f4',
            100: '#e0e3e4',
            200: '#c8d1d3',
            300: '#abb7b9',
            400: '#909c9e',
            500: '#95a5a6',
            600: '#7f8c8d',
            700: '#697a7b',
            800: '#556b6d',
            900: '#455a5c',
            A100: '#cfd8dc',
            A200: '#aab6bf',
            A400: '#81909a',
            A700: '#657b83',
        },
        purpule: {
            main: "#5b5ccd",
            contrastText: "#fff",
            light: "#7b7cd7",
            dark: "#3f408f",
            100: "#cecef0",
            200: "#8c8ddc",
            300: "#7c7dd7",
            400: "#6b6cd2",
            500: "#5b5ccd",
            600: "#5253b9",
            700: "#494aa4",
            800: "#404090",
            900: "#37377b"
        }
    },
}



export const useTheme = () => {
    return appTheme;
};


export const themesC = {
    default: {
        palette: {
            primary: {
                main: '#3498db',
                contrastText: color.whiteText,
            }
        },
    },
    dark: {
        palette: {
            primary: {
                main: '#6185d0',
                contrastText: '#000',
            },
            gray: {
                '100': '#333',
                '200': '#666',
                '300': '#888',
                '500': '#aaa',
                '800': '#ccc',
            },
        },
    },
};
