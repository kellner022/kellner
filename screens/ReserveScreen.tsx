import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabReserveScreenProps } from '../types';

export default function ReserveScreen({ route, navigation }: RootTabReserveScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservas</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text
        style={{
          fontSize: 25,
          fontFamily: "Montserrat-SemiBold",
          color: "white",
        }}
      >
        Próximamente, en breve, pronto ...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#C93E54',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
