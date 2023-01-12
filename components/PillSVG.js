import { Component } from 'react';
import Svg, { Path, G, SvgCss } from 'react-native-svg';

class PillSVG extends Component {

        constructor(props) {
                super(props);
        }

        render() {
                return (
                        <Svg
                                viewBox="175.163 100 124.837 124.89"
                                width={this.props.width}
                                height={this.props.height}
                                {...this.props}
                        >
                                <G style={{
                                        stroke: "#4BEE9A",
                                }}>
                                        <Path
                                                d="M242.555 151.851a24.658 24.658 0 0 1 17.492 7.246 24.658 24.658 0 0 1 7.246 17.492 24.658 24.658 0 0 1-7.246 17.492 24.658 24.658 0 0 1-17.492 7.246h-38.708v-49.476h38.708Z"
                                                style={{
                                                        fill: "#4bee9a",
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
}

export default PillSVG;