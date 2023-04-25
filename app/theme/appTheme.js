
const appTheme = {
    palette: {
        primary: {
            main: "#45aaf2",
            contrastText: "#fff",
            dark: "#4742ac",
            light: "#847ff7",
            50: '#e3f3fc',
            100: '#bce0fa',
            200: "#92cdf7",
            300: '#8FCCF7',
            400: '#45aaf2',
            500: '#239cf0',
            600: '#1c8ee3',
            700: '#137cd0',
            800: '#0b6bbe',
            900: '#004da0'
        },
        secondary: {
            main: "#987554",
            contrastText: "#fff",
            light: '#ac9076',
            dark: "#6a513a",
            50: '#f3eeea',
            100: '#e0d6cc',
            200: '#ccbaaa',
            300: '#b79e87',
            400: '#a78a6e',
            500: '#987554',
            600: '#906d4d',
            700: '#856243',
            800: '#7b583a',
            900: '#6a4529',
            A100: '#ffd1b0',
            A200: '#ffb37d',
            A400: '#ff954a',
            A700: '#ff8630',
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
}