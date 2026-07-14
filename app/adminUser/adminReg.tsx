import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, Image, Alert, ScrollView } from "react-native";
import { styles } from "../../styles/styles";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

const logo = require("../../assets/logotipo.png");

interface Produccion {
  idProduccion: number | string;
  turno: string;
  fecha_prod: string;

  proveedor_rinde: string;
  lote_rinde: string;

  num_canecas_rinde: number;
  litros_caneca_rinde: number;

  griego_inicio: number;
  agitado_inicio: number;

  suma_baches: number;
  kilos_baches_total: number;

  agitadas_final: number;
  descolgadas_final: number;
}

interface Bache {
  idBache: number;

  proveedor: string;
  lote: string;

  canecas_bache: number;
  kilos_bache: number;

  griego_entregado: number;
  entregado_kilos: number;
}

export default function () {
  type bache = {
    proveedor: string;
    lote: number;
    canecas: number;
  };

  const [turno, setTurno] = useState<null | String>();
  const [fecha, setFecha] = useState(new Date());
  const [picker, setPicker] = useState(false);
  const [produccion, setProduccion] = useState<Produccion | null>(null);
  const [baches, setBaches] = useState<Bache[]>([]);
  const [mostrarBaches, setMostrarBaches] = useState(false);
  const [text, setText] = useState("mostrar baches");
  const fechaActual = new Date();

  const handleConsultarRegistro = async () => {
    try {
      if (!turno || !fecha) {
        Alert.alert(
          "Error",
          "Por favor complete todos los campos antes de consultar el registro.",
        );
        return;
      }

      if (fecha > fechaActual) {
        Alert.alert("Error", "La fecha no puede ser mayor a la fecha actual.");
        return;
      }

      const res = await fetch(
        `http://10.0.2.2:4000/api/consultarRegistro?turno=${turno}&fecha=${fecha}`,
        {
          method: "GET",
        },
      );

      const data = await res.json();
      const { results, resultsB } = data;

      if (!res.ok) {
        Alert.alert("Error al consultar el registro", data.error);
        return;
      }

      if (results.length === 0) {
        Alert.alert(
          "Error",
          "No se encontraron registros para la fecha y turno seleccionados.",
        );
        return;
      }

      setProduccion(results[0]);
      setBaches(resultsB);
    } catch (error) {}
  };

  const handleEliminarRegistro = async () => {
    Alert.alert(
      "Deseas eliminar el usuario",
      `Desea eliminar este registro? Esta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar registro",
          onPress: () => {
            delRegistro();
          },
        },
      ],
    );
  };

  const delRegistro = async () => {
    if (!produccion) {
      Alert.alert("Error", "No hay registro seleccionado para eliminar.");
      return;
    }

    const idProduccion = produccion.idProduccion;

    const res = await fetch(
      `http://10.0.2.2:4000/api/eliminarRegistro/${idProduccion}`,
      {
        method: "DELETE",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      Alert.alert("Error al eliminar el registro", data.error);
      return;
    }

    Alert.alert(
      "Registro eliminado",
      "El registro ha sido eliminado exitosamente.",
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar style={"light"}></StatusBar>
        <Image source={logo} style={styles.logo}></Image>
        <Text style={styles.tittle}>
          Ingrese los datos para consultar el registro:
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

        <Pressable
          style={styles.buttonPrincipal}
          onPress={handleConsultarRegistro}
        >
          <Text style={styles.buttonText}>Consultar registro</Text>
        </Pressable>

        {produccion && (
          <View style={styles.secundaryContainer}>
            <Text style={styles.subttitle}>Turno: {produccion.turno}</Text>
            <Text style={styles.subttitle}>
              Fecha: {produccion.fecha_prod.split("T")[0]}
            </Text>
            <Text style={styles.subttitle}>
              Proveedor rinde: {produccion.proveedor_rinde}
            </Text>
            <Text style={styles.subttitle}>
              Lote de rinde: {produccion.lote_rinde}
            </Text>
            <Text style={styles.subttitle}>
              Canecas de rinde utilizadas: {produccion.num_canecas_rinde}
            </Text>
            <Text style={styles.subttitle}>
              Litros de rinde utilizados: {produccion.litros_caneca_rinde}
            </Text>
            <Text style={styles.subttitle}>
              Griego descolgado recibido: {produccion.griego_inicio}
            </Text>
            <Text style={styles.subttitle}>
              Griego agitado recibido: {produccion.agitado_inicio}
            </Text>
            <Text style={styles.subttitle}>
              Canecas de griego gastadas: {produccion.suma_baches}
            </Text>
            <Text style={styles.subttitle}>
              Kilos de griego gastados: {produccion.kilos_baches_total}
            </Text>
            <Text style={styles.subttitle}>
              Canecas agitadas entregadas: {produccion.agitadas_final}
            </Text>
            <Text style={styles.subttitle}>
              Canecas descolgadas entregadas: {produccion.descolgadas_final}
            </Text>

            <Pressable
              style={styles.buttonPrincipal}
              onPress={() => {
                mostrarBaches
                  ? setMostrarBaches(false)
                  : setMostrarBaches(true);
                mostrarBaches
                  ? setText("mostrar baches")
                  : setText("ocultar baches");
              }}
            >
              <Text style={styles.buttonText}>{text}</Text>
            </Pressable>
            <Pressable
              style={styles.buttonSecundario}
              onPress={handleEliminarRegistro}
            >
              <Text style={styles.buttonText}>Eliminar registro</Text>
            </Pressable>
          </View>
        )}

        {mostrarBaches && (
          <View style={styles.secundaryContainer}>
            {baches.map((bache, index) => (
              <View key={index} style={styles.bacheContainer}>
                <Text style={styles.subttitle}>
                  Proveedor: {bache.proveedor}
                </Text>
                <Text style={styles.subttitle}>Lote: {bache.lote}</Text>
                <Text style={styles.subttitle}>
                  Canecas: {bache.canecas_bache}
                </Text>
                <Text style={styles.subttitle}>
                  Kilos totales: {bache.kilos_bache}
                </Text>
                <Text style={styles.subttitle}>
                  Griego entregado: {bache.griego_entregado}
                </Text>
                <Text style={styles.subttitle}>
                  Kilos entregados: {bache.entregado_kilos}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
