import { StatusBar } from "expo-status-bar";
import { View, Text, TextInput, Pressable, Image, Alert } from "react-native";
import { styles } from "../../styles/styles";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
const logo = require("../../assets/logotipo.png");

interface DecodedTokenPayload {
  rol: string;
  idUsuarios: string;
  exp: number;
}

export default function Login() {
  const [idUsuarios, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!idUsuarios || !contraseña) {
        Alert.alert(
          "Error al iniciar sesion",
          "se debe ingresar todos los datos",
        );
        return;
      }

      const res = await fetch("http://10.0.2.2:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idUsuarios, contraseña }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error al iniciar sesion", data.error);
        return;
      }

      await SecureStore.setItemAsync("token", data.token);
      const decodedToken = jwtDecode<DecodedTokenPayload>(data.token);

      if (decodedToken.rol === "admin") {
        router.push("../adminUser/adminMain");
      } else if (decodedToken.rol === "regular") {
        router.push("../regularUser/regularMain");
      } else {
        router.push("../audiUser/audiMain");
      }
    } catch (_error) {
      console.error("error inesperado, intente mas tarde");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.tittle}>
        Bienvenido, a continuacion ingrese su usuario y contraseña:
      </Text>
      <TextInput
        style={styles.input}
        placeholder="usuario"
        placeholderTextColor={"#292828"}
        value={idUsuarios}
        onChangeText={(e) => {
          setUsuario(e);
        }}
      ></TextInput>
      <TextInput
        style={styles.input}
        placeholder="contraseña"
        placeholderTextColor={"#292828"}
        value={contraseña}
        onChangeText={(e) => {
          setContraseña(e);
        }}
        secureTextEntry={true}
      ></TextInput>
      <Pressable style={styles.buttonPrincipal} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar sesion</Text>
      </Pressable>
    </View>
  );
}
