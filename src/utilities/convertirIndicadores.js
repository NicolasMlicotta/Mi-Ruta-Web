export const arrayToObject = (array) => {
  let objeto = {};
  array.map(
    ({ indicador, texto, descripcion, flag, habilitado, mostrarPosicion }) => {
      objeto = {
        ...objeto,
        [indicador]: {
          indicador,
          texto,
          descripcion,
          flag,
          habilitado,
          mostrarPosicion,
        },
      };
    }
  );
  return objeto;
};

export const objectToArray = (obj) => {
  let arr = Object.keys(obj).map((key) => {
    return obj[key];
  });
  return arr;
};
