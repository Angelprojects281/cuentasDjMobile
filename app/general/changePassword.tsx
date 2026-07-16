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

const logo = require("../../assets/logotipo.png");

export default function changePassword() {
  const [idUsuarios, setUsuario] = useState("");
  const [cNueva, setContraseña] = useState("");
  const [confirmC, setConfirm] = useState("");
  const [codigo, setCodigo] = useState("");

  const handleCodigo = async () => {
    if (!idUsuarios || !cNueva || !confirmC) {
      Alert.alert(
        "No se pudo solicitar el código",
        "Faltan campos requeridos.",
      );
      return;
    }

    if (cNueva.length < 8) {
      Alert.alert(
        "No se pudo solicitar el código",
        "La contraseña es insegura; pruebe con otra distinta.",
      );
      return;
    }

    if (cNueva !== confirmC) {
      Alert.alert(
        "No se pudo solicitar el código",
        "Las contraseñas no coinciden.",
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
      Alert.alert("Error al enviar el código", data.error);
      return;
    }

    Alert.alert(
      "Código enviado correctamente",
      "Verifique el correo electrónico.",
    );
  };

  const handleCambiar = async () => {
    if (!codigo) {
      Alert.alert("Error al confirmar el código", "Debe ingresar un código.");
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
      Alert.alert("Error al confirmar el código", data.error);
      return;
    }

    Alert.alert(
      "Contraseña actualizada correctamente",
      "Ya puede iniciar sesión con la nueva contraseña.",
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
        <Text style={styles.title}>
          Ingrese los datos para cambiar su contraseña:
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          placeholderTextColor={"#292828"}
          value={idUsuarios}
          onChangeText={(e) => {
            setUsuario(e);
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Nueva contraseña"
          placeholderTextColor={"#292828"}
          secureTextEntry={true}
          value={cNueva}
          onChangeText={(e) => {
            setContraseña(e);
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          placeholderTextColor={"#292828"}
          secureTextEntry={true}
          value={confirmC}
          onChangeText={(e) => {
            setConfirm(e);
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Código de verificación"
          placeholderTextColor={"#292828"}
          secureTextEntry={false}
          value={codigo}
          onChangeText={(e) => {
            setCodigo(e);
          }}
        ></TextInput>
        <Pressable style={styles.buttonPrincipal}>
          <Text style={styles.buttonText} onPress={handleCodigo}>
            Solicitar código
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
