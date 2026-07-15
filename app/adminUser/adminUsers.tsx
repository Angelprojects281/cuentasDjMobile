import { StatusBar } from "expo-status-bar";
import { View, Text, Alert, Pressable, Image, ScrollView } from "react-native";
import { styles } from "../../styles/styles";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

const logo = require("../../assets/logotipo.png");

interface Usuario {
  idUsuarios: string;
  Rol: string;
}

export default function adminUsers() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const router = useRouter();
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
      Alert.alert("Error", "algo salio mal, intente mas tarde");
    }
  };

  useEffect(() => {
    ObtenerUsuarios();
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Image source={logo} style={styles.logo}></Image>
        <Text style={styles.tittle}>Bienvenido a la lista de usuarios: </Text>
        <View style={styles.secundaryContainer}>
          {usuarios.map((result, index) => (
            <View key={index} style={styles.bacheContainer}>
              <Text style={styles.subttitle}>Usuario: {result.idUsuarios}</Text>
              <Text style={styles.subttitle}>Rol: {result.Rol}</Text>
            </View>
          ))}
        </View>
        <Pressable
          style={styles.buttonPrincipal}
          onPress={() => router.push("./newUser")}
        >
          <Text style={styles.buttonText}>Nuevo usuario</Text>
        </Pressable>
        <Pressable style={styles.buttonPrincipal}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              router.push("./delUser");
            }}
          >
            Eliminar usuario
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
