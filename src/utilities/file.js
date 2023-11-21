import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import base64 from 'react-native-base64';
import {Alert} from 'react-native';

const columns = [
  'Evento',
  'Estado',
  'Hora actual',
  'Aleatorio',
  'Componente A',
  'Aleatorio',
  'Componente B',
  'Aleatorio',
  'Componente C',
  'Aleatorio',
  'Componente D',
  'Hora de fallo',
  'Componente Fallido',
  'Costo desconexion',
  'Costo componente',
  'Costo total',
];
const columnsID = [
  'eventNum',
  'type',
  'timeNow',
  'random1',
  'aliveTime1',
  'random2',
  'aliveTime2',
  'random3',
  'aliveTime3',
  'random4',
  'aliveTime4',
  'failTime',
  'failedComponents',
  'costDisconnect',
  'costComponent',
  'partialCost',
];

function formatDateToString(date) {
  const pad = num => (num < 10 ? '0' + num : num);

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear().toString().slice(2);
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}${month}${year}_${hours}${minutes}`;
}

export const createExcelFile = (configuration, events) => {
  let data = [
    ['Tiempo de vida (distribución normal):'],
    [
      'Media:',
      '',
      configuration.mean,
      '',
      'Tiempo de desconexión',
      '',
      configuration.timeDisconnect,
      'Costo total',
      configuration.cumulativeCost,
    ],
    ['Desviación e.', '', configuration.deviation],
    [''],
    ['Costos:', '', '', '', 'Política', configuration.type],
    ['Costo desconexión (Bs/hr)', '', configuration.costDisconnect],
    ['Costo componente (Bs/componente)', '', configuration.costComponent],
    [''],
    [''],
  ];
  const eventData = events.map(event => columnsID.map(col => event[col] || ''));
  data = [...data, columns, ...eventData];

  const ws = XLSX.utils.aoa_to_sheet(data);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const wbout = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'binary',
  });

  const fileName = `politica ${configuration.type} - ${formatDateToString(
    new Date(),
  )}`;
  const filePath = `${RNFS.DownloadDirectoryPath}/${fileName}.xlsx`;

  RNFS.writeFile(filePath, base64.encode(wbout), 'base64')
    .then(() => {
      Alert.alert(
        'Archivo descargado!',
        `El archivo ${fileName}.xlsx fue descargado correctamente.`,
      );
    })
    .catch(err => {
      console.log(err.message);
    });
};
