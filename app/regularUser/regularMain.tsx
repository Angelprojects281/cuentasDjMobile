import { StatusBar } from "expo-status-bar";
import { View, Text, Alert, Pressable, Image, BackHandler } from "react-native";
import { styles } from "../../styles/styles";
import { useRouter } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

const logo = require("../../assets/logotipo.png");

export default function () {
  const router = useRouter();
  const handleBack = () => {
    Alert.alert("Cerrar sesion", "Estas seguro que deseas cerrar sesion?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesion",
        onPress: () => {
          router.push("../");
        },
      },
    ]);
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        handleBack();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction,
      );
      return () => backHandler.remove();
    }, []),
  );
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.tittle}>Bienvenido al panel de usuario regular</Text>
      <Pressable
        style={styles.buttonPrincipal}
        onPress={() => router.push("./newReg")}
      >
        <Text style={styles.buttonText}>Nuevo registro</Text>
      </Pressable>
      <Pressable style={styles.buttonSecundario}>
        <Text style={styles.buttonText} onPress={handleBack}>
          Cerrar sesion
        </Text>
      </Pressable>
    </View>
  );
}
