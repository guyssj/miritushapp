import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { memo } from "react"

const ProfileRemoveSVG = (props) => (
    <Svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M26 25.333h-5.333m-4.68 3.747c-2.427 0-4.84-.613-6.68-1.84-3.227-2.16-3.227-5.68 0-7.827 3.666-2.453 9.68-2.453 13.346 0m-6.453-4.92a2.43 2.43 0 0 0-.44 0 5.893 5.893 0 0 1-5.693-5.906c0-3.267 2.64-5.92 5.92-5.92a5.914 5.914 0 0 1 .213 11.826v0Z"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

const ProfileRemove = memo(ProfileRemoveSVG)
export default ProfileRemove
