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
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

const logo = require("../../assets/logotipo.png");

export default function newReg() {
  type bache = {
    proveedor: string;
    lote: number;
    canecas: number;
  };
  const router = useRouter();
  const [picker, setPicker] = useState(false);
  const [turno, setTurno] = useState("");
  const [fecha, setFecha] = useState(new Date());
  const [proveedorR, setProveedorR] = useState("");
  const [loteR, setLoteR] = useState<number | null>(null);
  const [canecas20, setCanecas20] = useState<number | null>(null);
  const [canecas60, setCanecas60] = useState<number | null>(null);
  const [cdRecibidas, setCdrecibidas] = useState<number | null>(null);
  const [caRecibidas, setCarecibidas] = useState<number | null>(null);
  const [cdEntregadas, setCdEntragdas] = useState<number | null>(null);
  const [caEntregadas, setCaEntragdas] = useState<number | null>(null);
  const [listaBaches, setListaBaches] = useState<bache[]>([]);
  const [proveedor, setProveedor] = useState("");
  const [lote, setLote] = useState<number | null>(null);
  const [canecas, setCanecas] = useState<number | null>(null);

  const handleRegistrarBache = () => {
    if (!proveedor || !lote || !canecas) {
      Alert.alert("Error al registrar el bache", "Faltan campos requeridos.");
      return;
    }
    const nuevoBache = { proveedor, lote, canecas };
    setListaBaches([...listaBaches, nuevoBache]);
    setProveedor("");
    setLote(0);
    setCanecas(0);
  };

  const handleBorrarBache = () => {
    const copiaBaches = [...listaBaches];
    copiaBaches.pop();
    setListaBaches(copiaBaches);
  };

  const HacerRegistro = async () => {
    try {
      if (
        turno === "" ||
        !proveedorR.trim() ||
        loteR === null ||
        cdRecibidas === null ||
        caRecibidas === null ||
        cdEntregadas === null ||
        caEntregadas === null ||
        listaBaches.length === 0
      ) {
        Alert.alert("Error al crear el registro", "Faltan campos requeridos.");
        return;
      }

      Alert.alert(
        "¿Desea guardar los datos registrados?",
        `Se guardarán los datos para ${turno} el día ${fecha.toLocaleDateString("es-CO")}.`,
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
    } catch {
      Alert.alert("Error", "Algo salió mal. Inténtelo más tarde.");
    }
  };

  const registro = async () => {
    const res = await fetch("http://10.0.2.2:4000/api/crearRegistro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        turno,
        fecha,
        proveedorR,
        loteR,
        canecas20,
        canecas60,
        cdRecibidas,
        caRecibidas,
        cdEntregadas,
        caEntregadas,
        listaBaches,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      Alert.alert("Error al guardar el registro", data.error);
      return;
    }

    Alert.alert(
      "Datos registrados correctamente",
      `Se han registrado los datos del ${turno} para el día ${fecha.toLocaleDateString("es-CO")}.`,
    );
    router.push("./regularMain");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style={"light"}></StatusBar>
        <Image source={logo} style={styles.logo}></Image>
        <Text style={styles.title}>Ingrese los datos del registro:</Text>
        <Picker
          selectedValue={turno}
          onValueChange={(itemValue) => {
            setTurno(itemValue);
          }}
          style={styles.input}
        >
          <Picker.Item label="Seleccione un turno" value="" />
          <Picker.Item label="Turno 1" value="Turno 1" />
          <Picker.Item label="Turno 2" value="Turno 2" />
        </Picker>

        <Pressable
          style={styles.input}
          onPress={() => {
            setPicker(true);
          }}
        >
          <Text style={styles.buttonText}>Seleccionar fecha</Text>
        </Pressable>

        {picker && (
          <DateTimePicker
            value={fecha}
            mode="date"
            onValueChange={(event, fechaS) => {
              if (fechaS) {
                setFecha(fechaS);
                setPicker(false);
              }
            }}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Proveedor de rinde"
          placeholderTextColor={"#292828"}
          value={proveedorR}
          onChangeText={(e) => {
            setProveedorR(e);
          }}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Lote de rinde"
          placeholderTextColor={"#292828"}
          keyboardType="number-pad"
          onChangeText={(e) => {
            setLoteR(Number(e));
          }}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Cañecas 20"
          placeholderTextColor={"#292828"}
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCanecas20(Number(e));
          }}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="Cañecas 60"
          placeholderTextColor={"#292828"}
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCanecas60(Number(e));
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Descolgadas recibidas"
          placeholderTextColor={"#292828"}
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCdrecibidas(Number(e));
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Agitadas recibidas"
          placeholderTextColor={"#292828"}
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCarecibidas(Number(e));
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Descolgadas entregadas"
          placeholderTextColor={"#292828"}
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCdEntragdas(Number(e));
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="Agitadas entregadas"
          placeholderTextColor={"#292828"}
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCaEntragdas(Number(e));
          }}
        ></TextInput>

        <View style={styles.secondaryContainer}>
          <TextInput
            style={styles.input}
            placeholder="Proveedor"
            placeholderTextColor={"#292828"}
            onChangeText={(e) => {
              setProveedor(e);
            }}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Lote"
            placeholderTextColor={"#292828"}
            keyboardType="number-pad"
            onChangeText={(e) => {
              setLote(Number(e));
            }}
          ></TextInput>

          <TextInput
            style={styles.input}
            placeholder="Número de cañecas"
            placeholderTextColor={"#292828"}
            keyboardType="number-pad"
            onChangeText={(e) => {
              setCanecas(Number(e));
            }}
          ></TextInput>
          <Pressable
            style={styles.buttonPrincipal}
            onPress={handleRegistrarBache}
          >
            <Text style={styles.buttonText}>Registrar baches</Text>
          </Pressable>
          <Pressable
            style={styles.buttonSecundario}
            onPress={handleBorrarBache}
          >
            <Text style={styles.buttonText}>Borrar el último bache</Text>
          </Pressable>

          {listaBaches.length > 0 && (
            <Text style={styles.title}>Lista de baches</Text>
          )}
          {listaBaches.map((bache, index) => (
            <View key={index} style={styles.bacheContainer}>
              <Text style={styles.subtitle}>Proveedor: {bache.proveedor}</Text>
              <Text style={styles.subtitle}>Lote: {bache.lote}</Text>
              <Text style={styles.subtitle}>Cañecas: {bache.canecas}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.buttonPrincipal} onPress={HacerRegistro}>
          <Text style={styles.buttonText}>Hacer registro</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
