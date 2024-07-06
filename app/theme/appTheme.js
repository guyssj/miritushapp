
const appTheme = {
    palette: {
        primary: {
            main: "#3498db",
            contrastText: "#fff",
            dark: "#1f618d",
            light: "#5fa8e4",
            50: '#ebf5fb',
            100: '#d6eaf8',
            200: "#aed6f1",
            300: '#85c1e9',
            400: '#5dade2',
            500: '#3498db',
            600: '#2e86c1',
            700: '#2874a6',
            800: '#21618c',
            900: '#1b4f72'
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
}