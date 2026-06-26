import { StatusBar } from "expo-status-bar";
import { Pressable, Text, View, Image } from "react-native";
import { styles } from "../styles/styles";
import { useRouter } from "expo-router";

const logo = require("../assets/logotipo.png");

export default function App() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.tittle}>
        Bienvenido a cuentas DJ, da click para iniciar sesion
      </Text>
      <Pressable
        style={styles.buttonPrincipal}
        onPress={() => {
          router.push("/general/login");
        }}
      >
        <Text style={styles.buttonText}>Iniciar sesion</Text>
      </Pressable>
    </View>
  );
}
