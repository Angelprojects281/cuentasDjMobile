import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, Image, Alert, ScrollView } from "react-native";
import { styles } from "../../styles/styles";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";

const logo = require("../../assets/logotipo.png");

interface Usuario {
  idUsuarios: string;
  Rol: string;
}

export default function delUser() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [idUsuario, setIdUsuario] = useState<null | String>();
  const ObtenerUsuarios = async () => {
    try {
      const res = await fetch("http://10.0.2.2:4000/api/listarUsuarios");

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.error);
        return;
      }
      setUsuarios(data);
    } catch (error) {
      Alert.alert("Error", "Algo salió mal. Inténtelo más tarde.");
    }
  };

  useEffect(() => {
    ObtenerUsuarios();
  }, [usuarios]);

  const handleEliminarUsuario = async () => {
    if (idUsuario === "" || !idUsuario) {
      Alert.alert(
        "Error",
        "Por favor seleccione un usuario antes de eliminarlo.",
      );
      return;
    }

    Alert.alert(
      "¿Desea eliminar el usuario?",
      `¿Desea eliminar el usuario ${idUsuario}? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar usuario",
          onPress: () => {
            delUser();
          },
        },
      ],
    );
  };

  const delUser = async () => {
    try {
      const token = await SecureStore.getItemAsync("token");
      const res = await fetch(`http://10.0.2.2:4000/api/usuario/${idUsuario}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error al eliminar el usuario", data.error);
        return;
      }

      Alert.alert(
        "Usuario eliminado exitosamente",
        "El usuario ha sido eliminado correctamente.",
      );
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al eliminar el usuario.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style={"light"}></StatusBar>
      <Image source={logo} style={styles.logo}></Image>
      <Text style={styles.title}>
        Seleccione el usuario que desea eliminar:
      </Text>
      <Picker
        style={styles.input}
        onValueChange={(itemValue) => {
          setIdUsuario(itemValue as string);
        }}
      >
        <Picker.Item label="Seleccione un usuario" value="" />
        {usuarios.map((usuario, index) => (
          <Picker.Item
            key={index}
            label={usuario.idUsuarios}
            value={usuario.idUsuarios}
          />
        ))}
      </Picker>

      <Pressable style={styles.buttonPrincipal} onPress={handleEliminarUsuario}>
        <Text style={styles.buttonText}>Eliminar usuario</Text>
      </Pressable>
    </View>
  );
}
