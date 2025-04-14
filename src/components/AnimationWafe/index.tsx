import LottieView from 'lottie-react-native';

export default function AnimationWave() {
  return (
    <LottieView
      source={require('../../../assets/soundwave.json')}
      autoPlay
      loop
      style={{ height: 260, width: 260 }}
    />
  );
}
