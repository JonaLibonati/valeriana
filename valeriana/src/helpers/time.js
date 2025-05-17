import { Temporal } from "temporal-polyfill";
import { safeEvery } from "./miscellaneous";

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
  return DateObject.toInstant().toString().slice(0, 19)
}

export const toUtcMySqlTime = (durationTime) => {
  const [hours, minutes] = durationTime || [0,0];
  return `${hours}:${minutes}:00`
}

export const toDate = (mysqlDateTime, timeZone) => {
  return Temporal.Instant.from(mysqlDateTime).toZonedDateTimeISO(timeZone)
}

export const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const monthAbbr = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
export const dayAbbr = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
export const dayLongAbbr = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

export const countryIso3166 = [
  "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR",
  "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE",
  "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ",
  "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD",
  "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR",
  "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM",
  "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI",
  "FJ", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG",
  "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GT", "GU",
  "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE",
  "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM",
  "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR",
  "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS",
  "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG",
  "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS",
  "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE",
  "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM",
  "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR",
  "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA",
  "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL",
  "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ",
  "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN",
  "TO", "TR", "TT", "TV", "TZ", "UA", "UG", "UM", "US", "UY",
  "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS",
  "YE", "YT", "ZA", "ZM", "ZW"
];

export const timeZoneList = Intl.supportedValuesOf('timeZone');

export const getCountryTimeZoneList = (lang) => {
  let list = []
  const region = new Intl.DisplayNames([lang], { type: "region" })

  for (let i = 0; i < countryIso3166.length; i++) {
    const countryName = region.of(countryIso3166[i])
    const countryTimeZones = new Intl.Locale(`${lang}-${countryIso3166[i]}`).getTimeZones()

    for (let i = 0; i < countryTimeZones.length; i++) {
      list.push([countryTimeZones[i], `${countryTimeZones[i]}/${countryName}`])
    }
  }
  return list;
}

export const getCountryNameFromTimeZone = (timeZone, lang) => {
  const region = new Intl.DisplayNames([lang], { type: "region" })
  for (let i = 0; i < countryIso3166.length; i++) {
    const countryName = region.of(countryIso3166[i])
    const countryTimeZones = new Intl.Locale(`${lang}-${countryIso3166[i]}`).getTimeZones()

    const isTheCountry = safeEvery(countryTimeZones, (countryTimeZone) => countryTimeZone === timeZone)

    if (isTheCountry && countryTimeZones.length ) {
      return countryName
    }
  }
}


