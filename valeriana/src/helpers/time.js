import { Temporal } from "temporal-polyfill";

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
  return DateObject.toInstant().toString().slice(0, 19).replace('T', ' ')
}

export const toUtcMySqlTime = (minutes) => {
  const hours = Math.floor(Math.abs(minutes)/60)
  const minuteMod = minutes - hours * 60

  return `${hours}:${minuteMod}:00`
}

export const toDate = (mysqlDateTime) => {
  return Temporal.Instant.from(mysqlDateTime).toZonedDateTimeISO(Temporal.Now.zonedDateTimeISO().timeZoneId)
}

export const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
export const monthAbbr = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
export const dayNames = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
export const dayAbbr = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];
export const dayLongAbbr = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

export const countryIso3166 = ['AD','AE','AF','AG','AI','AL','AM','AO','AQ','AR','AS','AT','AU','AW','AX','AZ','BA','BB','BD','BE','BF','BG','BH','BI','BJ','BL','BM','BN','BO','BQ','BR','BS','BT','BV','BW','BY','BZ','CA','CC','CD','CF','CG','CH','CI','CK','CL','CM','CN','CO','CR','CU','CV','CW','CX','CY','CZ','DE','DJ','DK','DM','DO','DZ','EC','EE','EG','EH','ER','ES','ET','FI','FJ','FK','FM','FO','FR','GA','GB','GD','GE','GF','GG','GH','GI','GL','GM','GN','GP','GQ','GR','GS','GT','GU','GW','GY','HK','HM','HN','HR','HT','HU','ID','IE','IL','IM','IN','IO','IQ','IR','IS','IT','JE','JM','JO','JP','KE','KG','KH','KI','KM','KN','KP','KR','KW','KY','KZ','LA','LB','LC','LI','LK','LR','LS','LT','LU','LV','LY','MA','MC','MD','ME','MF','MG','MH','MK','ML','MM','MN','MO','MP','MQ','MR','MS','MT','MU','MV','MW','MX','MY','MZ','NA','NC','NE','NF','NG','NI','NL','NO','NP','NR','NU','NZ','OM','PA','PE','PF','PG','PH','PK','PL','PM','PN','PR','PS','PT','PW','PY','QA','RE','RO','RS','RU','RW','SA','SB','SC','SD','SE','SG','SH','SI','SJ','SK','SL','SM','SN','SO','SR','SS','ST','SV','SX','SY','SZ','TC','TD','TF','TG','TH','TJ','TK','TL','TM','TN','TO','TR','TT','TV','TW','TZ','UA','UG','UM','US','UY','UZ','VA','VC','VE','VG','VI','VN','VU','WF','WS','YE','YT','ZA','ZM','ZW'];

export const timeZoneList = Intl.supportedValuesOf('timeZone');

console.log(timeZoneList)

countryIso3166.map((isoCode) => {
  /* 
  To get country name.
  new Intl.DisplayNames(["es"], { type: "region" }).of(isoCode)
  */

  //new Intl.Locale(`en-${isoCode}`).getTimeZones().map((timezone) => timeZoneList.push([timezone, timezone]))

  
})
