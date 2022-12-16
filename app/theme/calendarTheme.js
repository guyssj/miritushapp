import { color } from "./color";

export const themesC = {
    default: {
        palette: {
            primary: {
                main: color.palette.blue,
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
    }
}