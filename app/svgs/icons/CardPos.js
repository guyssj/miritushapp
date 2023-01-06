import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const CardPosSVG = (props) => (
    <Svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M5.24 21.173 21.173 5.24m-6.372 19.133 1.6-1.6m1.99-1.988 3.186-3.186"
            stroke="#000"
            strokeWidth={1.5}
            strokeMiterlimit={10}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <Path
            d="M2.667 29.33h26.666M4.801 13.653l8.854-8.853c2.826-2.827 4.24-2.84 7.04-.04l6.546 6.546c2.8 2.8 2.787 4.214-.04 7.04L18.348 27.2c-2.827 2.826-4.24 2.84-7.04.04l-6.547-6.547c-2.8-2.8-2.8-4.2.04-7.04v0Z"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

const CardPos = memo(CardPosSVG)
export default CardPos
