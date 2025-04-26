import { useContext, useState } from "react";
import { ConfigElement } from "./ConfigElement";
import { ConfigHeading } from "./ConfigHeading";
import { ConfigSelect } from "./ConfigSelect";
import { UserContext } from "../../contexts/UserContext";
import { ConfigSelectFromList } from "./ConfigSelectFromList";
import { timeZoneList } from "../../helpers/time";
import { SearcherBar } from "../globalComponents/searcher/SearcherBar";

const normalizeText = (text) => {
 return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

export const ConfigCalendar = () => {

  const { user } = useContext(UserContext)

  const [locale, setLocale] = useState(['default'])
  const [timeZone, setTimeZone] = useState(['default'])

  const [timeZonesOptions, setTimeZonesOptions] = useState(timeZoneList)

  const locales = ['es-ES', 'us-US']

  const handleTimeZoneSearch = (e) => {
    const results = timeZoneList.filter((timeZone) => {
      const normalizedTimeZone = normalizeText(timeZone);
      const inputs = normalizeText(e.target.value).split(" ").filter(Boolean);
      return inputs.every((input) =>
        normalizedTimeZone.includes(input)
      );
    });
  
    setTimeZonesOptions(results)
  }

  return (
    <>
      <ConfigHeading text={'Calendario y Hora'}/>
      <ConfigElement name={'Local'}>
        <ConfigSelectFromList setter={[locale, setLocale]} elements={locales}/>
      </ConfigElement>
      <ConfigElement name={'Zona horaria'}>
        <ConfigSelectFromList setter={[timeZone, setTimeZone]} elements={timeZonesOptions}>
          <div className="m-2 w-full" onClick={(e) => e.stopPropagation()}>
            <SearcherBar placeholder={"Zona horaria"} handleSubmit={handleTimeZoneSearch}/>
          </div>
        </ConfigSelectFromList>
      </ConfigElement>
      <ConfigElement name={'Zonas horarias disponible en calendario'}>
        <ConfigSelectFromList setter={[locale, setLocale]} elements={locales}/>
      </ConfigElement>
    </>
  );
};
