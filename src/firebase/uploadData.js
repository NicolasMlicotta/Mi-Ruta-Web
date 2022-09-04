import { setDoc, doc } from "firebase/firestore";
import getDb from "./getDb";
import SHEET_API_KEY from "../api/googleSheetApiKey";

const uploadData = (setLoading, sheetId) => {
  setLoading(true);
  const [db] = getDb();
  const API_KEY = SHEET_API_KEY;
  const DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];
  const spreadsheetId = sheetId;
  const range = "DailyUpload!A:BD";

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
    //shift remueve la primer fila, ya que contiene los títulos de columnas
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
      let dni = dataArray[0];
      let m = numberFormat(dataArray[3]);
      let d = numberFormat(dataArray[4]);
      let idRegistro = dataArray[2] + dataArray[3] + dataArray[4];
      try {
        await setDoc(doc(db, "dailyupload", "driversdata", dni, idRegistro), {
          aniomesdia: dataArray[2] + m + d,
          dni: dataArray[0],
          fecha: dataArray[1],
          anio: dataArray[2],
          mes: dataArray[3],
          dia: dataArray[4],
          semana: dataArray[5],
          //------------------------ indicadores v1.2.0
          rmd_puntaje: dataArray[6],
          rmd_cantidad: dataArray[7],
          pedidos_ruteados: dataArray[8],
          pedidos_rechazados: dataArray[9],
          hl_ruteados: dataArray[10],
          hl_rechazados: dataArray[11],

          no_modulados: dataArray[12],
          reclamos: dataArray[13],
          dqi: dataArray[14],
          ruta_digital: dataArray[15],
          inicio_cierre: dataArray[16],
          ontime_uso: dataArray[17],
          adherencia: dataArray[18],
          pnp: dataArray[19],
          dispersion_km: dataArray[20],
          dispersion_tiempos: dataArray[21],
          cincos: dataArray[22],
          skap: dataArray[23],

          //------------------------ targets V2.0.0
          tgt_prom_rmd: dataArray[24],
          tgt_rmd_cantidad: dataArray[25],
          tgt_pedidos_rechazados: dataArray[26],
          tgt_hl_rechazados: dataArray[27],
          tgt_no_mod: dataArray[28],
          tgt_reclamos: dataArray[29],
          tgt_prom_dqi: dataArray[30],
          tgt_ruta_digital: dataArray[31],
          tgt_prom_inicio_cierre: dataArray[32],
          tgt_prom_uso_ontime: dataArray[33],
          tgt_adherencia: dataArray[34],
          tgt_pnp: dataArray[35],
          tgt_prom_disp_km: dataArray[36],
          tgt_prom_disp_tiempo: dataArray[37],
          tgt_cincos: dataArray[38],
          tgt_skap: dataArray[39],
          //----------------------------- posiciones v1.2.0
          pos_rmd: dataArray[40],
          pos_pdv_puntuados: dataArray[41],
          pos_pedidos_rech: dataArray[42],
          pos_hl_rech: dataArray[43],
          pos_no_mod: dataArray[44],
          pos_reclamos: dataArray[45],
          pos_dqi: dataArray[46],
          pos_ruta_digital: dataArray[47],
          pos_inicio_cierre: dataArray[48],
          pos_uso_bees: dataArray[49],
          pos_adherencia: dataArray[50],
          pos_pnp: dataArray[51],
          pos_disp_km: dataArray[52],
          pos_disp_tiempo: dataArray[53],
          pos_cincos: dataArray[54],
          pos_skap: dataArray[55],
        });
        if (datos.length - 1 === index) {
          window.alert("Datos cargados correctamente");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        // window.alert("Ocurrió un error cargando los datos. Intentá nuevamente");
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
export default uploadData;
