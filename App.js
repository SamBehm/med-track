import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Svg, { Path, G, SvgCss } from 'react-native-svg';

export default function App() {
  return (
    <View style={styles.container}>
      <View>
        <PillButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  circleButton: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    borderWidth: 2,
    borderRadius: 75,
    borderColor: '#4bee9a',
  },
});

function PillButton({ onPress, size }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.circleButton}>
        <PillSVGComponent width={75} height={75} />
      </View>
    </TouchableOpacity>
  )
}

const PillSVGComponent = (props) => (
  <Svg
    viewBox="175.163 100 124.837 124.89"
    width={props.width}
    height={props.height}
    {...props}
  >
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
        fill: "#000",
      }}
      transform="rotate(-45.004 280.428 160.459)"
    />
  </Svg>
);