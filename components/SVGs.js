import Svg, { Path, G, Circle, Rect } from 'react-native-svg';

export function PillSVG(props) {
        return (
                <Svg
                        viewBox="175.163 100 124.837 124.89"
                        {...props}
                >
                        <G style={{
                                stroke: props.color,
                        }}>
                                <Path
                                        d="M242.555 151.851a24.658 24.658 0 0 1 17.492 7.246 24.658 24.658 0 0 1 7.246 17.492 24.658 24.658 0 0 1-7.246 17.492 24.658 24.658 0 0 1-17.492 7.246h-38.708v-49.476h38.708Z"
                                        style={{
                                                fill: props.color,
                                        }}
                                        transform="rotate(134.996 223.594 176.535)"
                                />
                                <Path
                                        d="M287.544 106.81a24.658 24.658 0 0 1 17.492 7.246 24.658 24.658 0 0 1 7.246 17.492 24.658 24.658 0 0 1-7.246 17.492 24.658 24.658 0 0 1-17.492 7.246h-38.708V106.81h38.708Z"
                                        style={{
                                                fill: "#fff",
                                        }}
                                        transform="rotate(-45.004 280.428 160.459)"
                                />
                        </G>

                </Svg>
        );
}

export function CalendarSVG(props) {
        return (
                <Svg
                        id="_x32_"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        {...props}
                >
                        <G style={{ fill: props.color }}>
                                <Path
                                        d="M149.193,103.525c15.994,0,28.964-12.97,28.964-28.972V28.964C178.157,12.97,165.187,0,149.193,0 C133.19,0,120.22,12.97,120.22,28.964v45.589C120.22,90.556,133.19,103.525,149.193,103.525z"
                                />
                                <Path
                                        d="M362.815,103.525c15.994,0,28.964-12.97,28.964-28.972V28.964C391.78,12.97,378.81,0,362.815,0 c-16.003,0-28.972,12.97-28.972,28.964v45.589C333.843,90.556,346.813,103.525,362.815,103.525z"
                                />
                                <Path
                                        d="M435.164,41.287h-17.925v33.266c0,30.017-24.415,54.431-54.423,54.431c-30.017,0-54.431-24.414-54.431-54.431 V41.287H203.615v33.266c0,30.017-24.414,54.431-54.422,54.431c-30.018,0-54.432-24.414-54.432-54.431V41.287H76.836 c-38.528,0-69.763,31.235-69.763,69.763v331.187C7.073,480.765,38.308,512,76.836,512h358.328 c38.528,0,69.763-31.235,69.763-69.763V111.05C504.927,72.522,473.691,41.287,435.164,41.287z M470.982,442.237 c0,19.748-16.07,35.818-35.818,35.818H76.836c-19.749,0-35.818-16.07-35.818-35.818V155.138h429.964V442.237z"
                                />
                                <Rect
                                        x={183.676}
                                        y={377.571}
                                        width={56.727}
                                        height={56.727}
                                />
                                <Rect
                                        x={183.676}
                                        y={289.65}
                                        width={56.727}
                                        height={56.727}
                                />
                                <Rect
                                        x={95.765}
                                        y={377.571}
                                        width={56.718}
                                        height={56.727}
                                />
                                <Rect
                                        x={95.765}
                                        y={289.65}
                                        width={56.718}
                                        height={56.727}
                                />
                                <Rect
                                        x={359.517}
                                        y={201.73}
                                        width={56.718}
                                        height={56.727}
                                />
                                <Rect
                                        x={271.597}
                                        y={201.73}
                                        width={56.735}
                                        height={56.727}
                                />
                                <Rect
                                        x={271.597}
                                        y={289.65}
                                        width={56.735}
                                        height={56.727}
                                />
                                <Rect
                                        x={359.517}
                                        y={377.571}
                                        width={56.718}
                                        height={56.727}
                                />
                                <Rect
                                        x={359.517}
                                        y={289.65}
                                        width={56.718}
                                        height={56.727}
                                />
                                <Rect
                                        x={271.597}
                                        y={377.571}
                                        width={56.735}
                                        height={56.727}
                                />
                                <Rect
                                        x={183.676}
                                        y={201.73}
                                        width={56.727}
                                        height={56.727}
                                />
                                <Rect
                                        x={95.765}
                                        y={201.73}
                                        width={56.718}
                                        height={56.727}
                                />
                        </G>
                </Svg>
        )
}

export function GraphSVG(props) {
        return (
                <Svg
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        {...props}
                >
                        <Path
                                style={{
                                        fill: props.color
                                }}
                                d="M17.584 9.372h2a9.554 9.554 0 0 0-.668-2.984L17.16 7.402c.224.623.371 1.283.424 1.97zm-3.483-8.077a9.492 9.492 0 0 0-3.086-.87v2.021a7.548 7.548 0 0 1 2.084.585l1.002-1.736zm2.141 4.327l1.741-1.005a9.643 9.643 0 0 0-2.172-2.285l-1.006 1.742a7.625 7.625 0 0 1 1.437 1.548zm-6.228 11.949a7.6 7.6 0 0 1-7.6-7.6c0-3.858 2.877-7.036 6.601-7.526V.424C4.182.924.414 5.007.414 9.971a9.6 9.6 0 0 0 9.601 9.601c4.824 0 8.807-3.563 9.486-8.2H17.48c-.658 3.527-3.748 6.199-7.466 6.199z" />
                </Svg>
        );
}