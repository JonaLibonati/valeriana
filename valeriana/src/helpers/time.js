
export const updateTime = ({ setDate, setDay, setMonth, setHours, setMinutes }) => {
  const now = new Date();
  const date = now.getDate();
  const day = now.getDay();
  const month = now.getMonth();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  // Format the string with leading zeroes
  setDate(date);
  setDay(day);
  setMonth(month);
  setHours(`${hours.toString().padStart(2, '0')}`);
  setMinutes(`${minutes.toString().padStart(2, '0')}`);

  // Set a timeout for one minute
  setTimeout(updateTime, 60000, { setDate, setDay, setMonth, setHours, setMinutes });
}

export const toUtcMySqlDate = (DateObject) => {
  return DateObject.toISOString().slice(0, 19).replace('T', ' ')
}

export const toUtcMySqlTime = (minutes) => {
  const hours = Math.floor(Math.abs(minutes)/60)
  const minuteMod = minutes - hours * 60

  return `${hours}:${minuteMod}:00`
}

export const toDate = (mysqlDateTime) => {
  return new Date(mysqlDateTime)
}

export const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const monthAbbr = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
export const dayAbbr = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
export const dayLongAbbr = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];