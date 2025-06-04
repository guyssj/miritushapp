import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

interface SpacingType {
    spacing: number[]
}

const useSpacing = (): SpacingType => {
    const store = useContext(ThemeContext);
    if (!store) {
        throw new Error('useColors must be defined.');
    }

    return {
        spacing: store.spacing
    };
};

export default useSpacing;