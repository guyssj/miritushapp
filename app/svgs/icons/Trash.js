import * as React from "react"
import Svg, {
    Path,
    Ellipse,
    Rect,
    Text,
    TSpan,
    Circle,
    G,
} from "react-native-svg"

import { memo } from "react"


const TrashSvg = (props) => (
    <Svg
        width={32}
        height={32}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M28 7.973c-4.44-.44-8.907-.666-13.36-.666-2.64 0-5.28.133-7.92.4L4 7.973m7.333-1.346.294-1.747c.213-1.267.373-2.213 2.626-2.213h3.494c2.253 0 2.426 1 2.626 2.226l.294 1.734m4.466 5.56-.866 13.426c-.147 2.094-.267 3.72-3.987 3.72h-8.56c-3.72 0-3.84-1.626-3.987-3.72l-.866-13.426M13.773 22h4.44m-5.546-5.333h6.666"
            stroke="#000"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

const Trash = memo(TrashSvg)
export default Trash

