
const appTheme = {
    palette: {
        primary: {
            main: "#665FF6",
            contrastText: "#fff",
            dark: "#4742ac",
            light: "#847ff7",
            200: "#F1EFFE"
        },
        secondary: {
            main: "#df734f",
            contrastText: "#fff",
            light: '#e58f72',
            dark: "#9c5037",
            100: "#efb9a7",
            200: "#e99d84",
            300: "#e58f72",
            400: "#e28161",
            500: "#df734f",
            600: "#c96847",
            700: "#b25c3f",
            800: "#9c5137",
            900: "#703a28"
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