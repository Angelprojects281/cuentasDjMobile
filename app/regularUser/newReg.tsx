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

export default function Login() {
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
      Alert.alert("Error al registrar el  bache", "faltan campos requeridos");
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
        Alert.alert("Error al crear el registro", "faltan campos requeridos");
        return;
      }

      Alert.alert(
        "Deseas guardar los datos registrados",
        `guardando los datos para ${turno} el dia ${fecha.toLocaleDateString("es-CO")}`,
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
    } catch {}
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
      Alert.alert("Error al guardar el resgitro", data.error);
      return;
    }

    Alert.alert(
      "Datos registrados exitosamente",
      `se han registrado los datos del ${turno} para el dia ${fecha.toLocaleDateString("es-CO")}`,
    );
    router.push("./regularMain");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style={"light"}></StatusBar>
        <Image source={logo} style={styles.logo}></Image>
        <Text style={styles.tittle}>
          Ingrese los datos para cambiar su contraseña:
        </Text>
        <Picker
          selectedValue={turno}
          onValueChange={(itemValue) => {
            setTurno(itemValue);
          }}
          style={styles.input}
        >
          <Picker.Item label="seleccione turno" value="" />
          <Picker.Item label="Turno 1" value="Turno 1" />
          <Picker.Item label="Turno 2" value="Turno 2" />
        </Picker>

        <Pressable
          style={styles.input}
          onPress={() => {
            setPicker(true);
          }}
        >
          <Text style={styles.buttonText}>seleccionar fecha</Text>
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
          placeholder="proveedor de rinde"
          value={proveedorR}
          onChangeText={(e) => {
            setProveedorR(e);
          }}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="lote de rinde"
          keyboardType="number-pad"
          onChangeText={(e) => {
            setLoteR(Number(e));
          }}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="canecas 20"
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCanecas20(Number(e));
          }}
        ></TextInput>

        <TextInput
          style={styles.input}
          placeholder="canecas 60"
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCanecas60(Number(e));
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="descolgadas recibidas"
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCdrecibidas(Number(e));
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="agitadas recibidas"
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCarecibidas(Number(e));
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="descolgadas entregadas"
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCdEntragdas(Number(e));
          }}
        ></TextInput>
        <TextInput
          style={styles.input}
          placeholder="agitadas entregadas"
          keyboardType="number-pad"
          onChangeText={(e) => {
            setCaEntragdas(Number(e));
          }}
        ></TextInput>

        <View style={styles.secundaryContainer}>
          <TextInput
            style={styles.input}
            placeholder="proveedor"
            onChangeText={(e) => {
              setProveedor(e);
            }}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="lote"
            keyboardType="number-pad"
            onChangeText={(e) => {
              setLote(Number(e));
            }}
          ></TextInput>

          <TextInput
            style={styles.input}
            placeholder="numero de canecas"
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
            <Text style={styles.buttonText}>Borrar ultimo bache</Text>
          </Pressable>

          {listaBaches.length > 0 && (
            <Text style={styles.tittle}>Lista de baches</Text>
          )}
          {listaBaches.map((bache, index) => (
            <View key={index} style={styles.bacheContainer}>
              <Text style={styles.subttitle}>proveedor: {bache.proveedor}</Text>
              <Text style={styles.subttitle}>lote: {bache.lote}</Text>
              <Text style={styles.subttitle}>Canecas: {bache.canecas}</Text>
            </View>
          ))}
        </View>

        <Pressable style={styles.buttonPrincipal} onPress={HacerRegistro}>
          <Text style={styles.buttonText}>Hacer Registro</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
