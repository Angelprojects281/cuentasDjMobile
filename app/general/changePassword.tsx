import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import { styles } from "../../styles/styles";
import { useState } from "react";
import { jsx } from "react/jsx-runtime";

const logo = require("../../assets/logotipo.png");

export default function Login() {
  const [idUsuarios, setUsuario] = useState("");
  const [cNueva, setContraseña] = useState("");
  const [confirmC, setConfirm] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleCodigo = async () => {
    if (!idUsuarios || !cNueva || !confirmC) {
      Alert.alert("No se pudo solicitar el codigo", "faltan campos requeridos");
      return;
    }

    if (cNueva.length < 8) {
      Alert.alert(
        "No se puedo solicitar el codigo",
        "la contraseña es insegura, prueba con otra diferente",
      );
      return;
    }

    if (cNueva !== confirmC) {
      Alert.alert(
        "No se pudo solicitar el codigo",
        "las contraseñas no coinciden",
      );
      return;
    }

    const res = await fetch("http://10.0.2.2:4000/api/cambiarcontrasena", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUsuarios,
        cNueva,
        confirmC,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      Alert.alert("Error al enviar el codigo", data.error);
      return;
    }

    Alert.alert(
      "Codigo enviado correctamente",
      "verifique el correo electronico",
    );
  };

  const handleCambiar = async () => {
    if (!codigo) {
      Alert.alert("Erro al cofirmar el codigo", "debes ingresar un codigo");
      return;
    }
    const res = await fetch("http://10.0.2.2:4000/api/verificarCodigo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        idUsuarios,
        codigo,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      Alert.alert("Error al confirmar el codigo", data.error);
      return;
    }

    Alert.alert(
      "Contraseña actualizada correctamente",
      "ya puede iniciar sesion con la nueva contraseña",
    );

    setUsuario("");
    setContraseña("");
    setConfirm("");
    setCodigo("");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style={"light"}></StatusBar>
        <Image source={logo} style={styles.logo}></Image>
        <Text style={styles.tittle}>
          Ingrese los datos para cambiar su contraseña:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="usuario"
          value={idUsuarios}
          onChangeText={(e) => {
            setUsuario(e);
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="contraseña nueva"
          secureTextEntry={true}
          value={cNueva}
          onChangeText={(e) => {
            setContraseña(e);
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry={true}
          value={confirmC}
          onChangeText={(e) => {
            setConfirm(e);
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Codigo verificacion"
          secureTextEntry={false}
          value={codigo}
          onChangeText={(e) => {
            setCodigo(e);
          }}
        ></TextInput>
        <Pressable style={styles.buttonPrincipal}>
          <Text style={styles.buttonText} onPress={handleCodigo}>
            Solicitar codigo
          </Text>
        </Pressable>
        <Pressable style={styles.buttonPrincipal}>
          <Text style={styles.buttonText} onPress={handleCambiar}>
            Cambiar contraseña
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
