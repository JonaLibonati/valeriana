
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

  console.log(date)

  // Set a timeout for one minute
  setTimeout(updateTime, 60000, { setDate, setDay, setMonth, setHours, setMinutes });
}

export const monthNames = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"]; // array of month names

export const monthAbbr = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic"]; // array of month Abbreviation

export const dayNames = [
  "Domingo",
  "Lunes",
  "Martes",
  "Miercoles",
  "Jueves",
  "Viernes",
  "Sabado"]; // array of day names

export const dayAbbr = [
  "Dom",
  "Lun",
  "Mar",
  "Mie",
  "Jue",
  "Vie",
  "Sab"]; // array of day Abbreviation

export const dayLetter = ['D', 'L', 'M', 'M', 'J', 'V', 'S']; // array of day Abbreviation