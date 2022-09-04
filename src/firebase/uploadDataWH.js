import { setDoc, doc } from "firebase/firestore";
import getDb from "./getDb";
import SHEET_API_KEY from "../api/googleSheetApiKey";

const uploadDataWH = (setLoading, sheetId) => {
  setLoading(true);
  const [db] = getDb();
  const API_KEY = SHEET_API_KEY;
  const DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];
  const spreadsheetId = sheetId;
  const range = "DailyUpload!A:AX";

  /*global gapi*/
  function initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
      })
      .then(
        function () {
          ReadSheet();
        },
        function (error) {
          console.log(error);
          window.alert("Ocurrió un error conectando con el sheet");
        }
      );
  }

  function ReadSheet() {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: range,
      })
      .then(function (response) {
        WriteFirestore(response.result.values);
      })
      .catch((err) => console.log(err));
  }
  async function WriteFirestore(datos) {
    if (datos.length == 1) {
      window.alert("Sheet sin datos");
      setLoading(false);
    }
    // const categorias = datos[0];
    //shift remueve las primeras 2 filas, ya que contiene los títulos de columnas
    datos.shift();
    datos.shift();

    //función para subir individualmente cada documento (fila del sheet)
    const uploadDocument = async (dataArray, index) => {
      const numberFormat = (num) => {
        if (num.length == 1) {
          return "0" + num;
        } else {
          return num;
        }
      };

      let m = numberFormat(dataArray[3]);
      let d = numberFormat(dataArray[4]);
      let idRegistro = dataArray[2] + dataArray[3] + dataArray[4];
      try {
        await setDoc(doc(db, "dailyupload", "whdata", "deposito", idRegistro), {
          aniomesdia: dataArray[2] + m + d,
          dni: dataArray[0],
          fecha: dataArray[1],
          anio: dataArray[2],
          mes: dataArray[3],
          dia: dataArray[4],
          semana: dataArray[5],

          //indicadores
          comp_inseg: dataArray[6],
          comp_seg: dataArray[7],
          incidentes: dataArray[8],
          ocupacion: dataArray[9],
          picking_smk: dataArray[10],
          picking_mino: dataArray[11],
          errores_smk_faltante: dataArray[12],
          errores_smk_sobrante: dataArray[13],
          errores_smk_cambiado: dataArray[14],
          errores_mino_faltante: dataArray[15],
          errores_mino_sobrante: dataArray[16],
          errores_mino_cambiado: dataArray[17],
          bultos_rotos: dataArray[18],
          principal_sku_roto: dataArray[19],
          tiempo_atencion: dataArray[20],
          tiempo_ciclo: dataArray[21],
          ip_atendidos: dataArray[22],
          adherencia_a: dataArray[23],
          adherencia_b: dataArray[24],
          adherencia_c: dataArray[25],
          pallets_clasificados: dataArray[26],
          ocupacion_playa: dataArray[27],

          //targets
          tgt_comp_inseg: dataArray[28],
          tgt_comp_seg: dataArray[29],
          tgt_incidentes: dataArray[30],
          tgt_ocupacion: dataArray[31],
          tgt_picking_smk: dataArray[32],
          tgt_picking_mino: dataArray[33],
          tgt_errores_smk_faltante: dataArray[34],
          tgt_errores_smk_sobrante: dataArray[35],
          tgt_errores_smk_cambiado: dataArray[36],
          tgt_errores_mino_faltante: dataArray[37],
          tgt_errores_mino_sobrante: dataArray[38],
          tgt_errores_mino_cambiado: dataArray[39],
          tgt_bultos_rotos: dataArray[40],
          tgt_principal_sku_roto: dataArray[41],
          tgt_tiempo_atencion: dataArray[42],
          tgt_tiempo_ciclo: dataArray[43],
          tgt_ip_atendidos: dataArray[44],
          tgt_adherencia_a: dataArray[45],
          tgt_adherencia_b: dataArray[46],
          tgt_adherencia_c: dataArray[47],
          tgt_pallets_clasificados: dataArray[48],
          tgt_ocupacion_playa: dataArray[49],
        });
        if (datos.length - 1 === index) {
          window.alert("Datos cargados correctamente");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        window.alert("Ocurrió un error cargando los datos. Intentá nuevamente");
        return;
      }
    };
    //llama uploadDocument por cada fila con datos leída
    datos.map((dato, index) => {
      uploadDocument(dato, index);
    });
  }
  gapi.load("client", initClient);
};
export default uploadDataWH;
