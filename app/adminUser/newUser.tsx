import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, Image, Alert, TextInput } from "react-native";
import { styles } from "../../styles/styles";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";

const logo = require("../../assets/logotipo.png");

export default function newUser() {
  const [Rol, setRol] = useState<null | String>();
  const [idUsuarios, setIdUsuarios] = useState<null | String>();
  const [cNueva, setPassword] = useState<null | String>();
  const router = useRouter();

  const handleCrearUsuario = async () => {
    if (Rol === "" || !idUsuarios || !cNueva) {
      Alert.alert(
        "Error",
        "Por favor complete todos los campos antes de crear el usuario.",
      );
      return;
    }

    if (cNueva.length < 8) {
      Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    Alert.alert(
      "¿Desea crear el usuario?",
      `Se guardarán los datos para el usuario ${idUsuarios} con el rol ${Rol}.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Registrar datos",
          onPress: () => {
            registro();
          },
        },
      ],
    );
  };

  const registro = async () => {
    try {
      const res = await fetch("http://10.0.2.2:4000/api/crearUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idUsuarios,
          cNueva,
          Rol,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error al crear el usuario", data.error);
        return;
      }

      Alert.alert(
        "Usuario creado exitosamente",
        "El usuario ha sido creado correctamente.",
      );

      router.push("./adminUsers");
    } catch (error) {
      Alert.alert("Error", "Algo salió mal. Inténtelo más tarde.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={"light"}></StatusBar>
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.title}>Ingrese los datos para crear un usuario:</Text>
      <Picker
        selectedValue={Rol}
        onValueChange={(itemValue) => {
          setRol(itemValue);
        }}
        style={styles.input}
      >
        <Picker.Item label="Seleccione un rol" value="" />
        <Picker.Item label="Administrador" value="admin" />
        <Picker.Item label="Regular" value="regular" />
        <Picker.Item label="Auditor" value="auditor" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Usuario"
        placeholderTextColor={"#292828"}
        onChangeText={(e) => {
          setIdUsuarios(e);
        }}
      ></TextInput>

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        placeholderTextColor={"#292828"}
        secureTextEntry={true}
        onChangeText={(e) => {
          setPassword(e);
        }}
      ></TextInput>

      <Pressable style={styles.buttonPrincipal} onPress={handleCrearUsuario}>
        <Text style={styles.buttonText}>Crear usuario</Text>
      </Pressable>
    </View>
  );
}
