import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, Image, Alert, ScrollView } from "react-native";
import { styles } from "../../styles/styles";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";

const logo = require("../../assets/logotipo.png");
interface Activity {
  fecha: string;
  detalles: string;
}

export default function searchActivity() {
  const [fechaInicial, setFechaInicial] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(new Date());
  const [activityType, setActivityType] = useState<null | String>();
  const [pickerInit, setPickerInit] = useState(false);
  const [pickerFinal, setPickerFinal] = useState(false);
  const [results, setResults] = useState<Activity[]>([]);
  const fechaActual = new Date();

  const handleConsultActivity = async () => {
    if (activityType === "" || !fechaInicial || !fechaFinal) {
      Alert.alert(
        "Error",
        "Por favor complete todos los campos antes de consultar la actividad.",
      );
      return;
    }

    if (fechaInicial > fechaFinal) {
      Alert.alert(
        "Error",
        "La fecha inicial no puede ser mayor que la fecha final.",
      );
      return;
    }

    if (fechaFinal > fechaActual || fechaInicial > fechaActual) {
      Alert.alert(
        "Error",
        "Las fechas no pueden ser mayores a la fecha actual.",
      );
      return;
    }

    const res = await fetch(
      `http://10.0.2.2:4000/api/consultarAuditoria?tipoActividad=${activityType}&fechaInicio=${fechaInicial}&fechaFin=${fechaFinal}`,
      {
        method: "GET",
      },
    );

    const data = await res.json();

    if (!res.ok) {
      Alert.alert("Error al consultar la actividad", data.error);
      return;
    }
    setResults(data);
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
          selectedValue={activityType}
          onValueChange={(itemValue) => {
            setActivityType(itemValue);
          }}
          style={styles.input}
        >
          <Picker.Item label="Seleccione la actividad" value="" />
          <Picker.Item label="Inicios de sesion" value="inicio_sesion" />
          <Picker.Item label="Codigos generados" value="codigo_verificacion" />
          <Picker.Item
            label="Cambios de contraseña"
            value="cambio_contraseña"
          />
          <Picker.Item label="Nuevos registros" value="nuevo_registro" />
          <Picker.Item
            label="Eliminacion de registros"
            value="eliminar_registro"
          />
          <Picker.Item
            label="Creacion de nuevos usuarios"
            value="nuevo_usuario"
          />
          <Picker.Item
            label="Eliminacion de usuarios"
            value="eliminar_usuario"
          />
        </Picker>

        <Pressable
          style={styles.input}
          onPress={() => {
            setPickerInit(true);
          }}
        >
          <Text style={styles.buttonText}>seleccionar fecha inicio</Text>
        </Pressable>

        {pickerInit && (
          <DateTimePicker
            value={fechaInicial}
            mode="date"
            onValueChange={(event, fechaS) => {
              if (fechaS) {
                setFechaInicial(fechaS);
                setPickerInit(false);
              }
            }}
          />
        )}

        <Pressable
          style={styles.input}
          onPress={() => {
            setPickerFinal(true);
          }}
        >
          <Text style={styles.buttonText}>seleccionar fecha fin</Text>
        </Pressable>

        {pickerFinal && (
          <DateTimePicker
            value={fechaFinal}
            mode="date"
            onValueChange={(event, fechaFinal) => {
              if (fechaFinal) {
                setFechaFinal(fechaFinal);
                setPickerFinal(false);
              }
            }}
          />
        )}

        <Pressable
          style={styles.buttonPrincipal}
          onPress={handleConsultActivity}
        >
          <Text style={styles.buttonText}>Consultar actividad</Text>
        </Pressable>

        <Text style={styles.tittle}>
          Lista de actividades: se han encontrado {results.length} resultados
        </Text>
        <View style={styles.secundaryContainer}>
          {results.map((result, index) => (
            <View key={index} style={styles.bacheContainer}>
              <Text style={styles.subttitle}>
                Fecha: {result.fecha.split("T")[0]}
              </Text>
              <Text style={styles.subttitle}>detalles: {result.detalles}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
