import { Text, View } from 'react-native';

export default function SignIn() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text onPress={() => signIn()}>Sign In</Text>
    </View>
  );
}
