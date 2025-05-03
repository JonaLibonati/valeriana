import { useEffect, useMemo, useState } from "react";
import { ConfigElement } from "./ConfigElement";
import { ConfigHeading } from "./ConfigHeading";
import { ConfigSelectFromList } from "./ConfigSelectFromList";
import { getCountryTimeZoneList, timeZoneList } from "../../helpers/time";
import { Temporal } from "temporal-polyfill";
import { SearcherBarOnChange } from "../globalComponents/searcher/SearcherBarOnchange";
import { ConfigMultipleSelect } from "./ConfigMultipleSelect";
import { filterExcludedItems, normalizeText } from "../../helpers/miscellaneous";
import { useEffectAfterMonting } from "../../hooks/useEffectAfterMonting";
import { useAfterIsLoaded } from "../../hooks/useAfterIsLoaded";
import { useData } from "../../contexts/DataContext";
import { useConfig } from "../../contexts/ConfigContext";
import { Loading } from "../globalComponents/loading/Loading";

export const ConfigCalendar = () => {

  const { config, firstLoading } = useData();
  const { handleSetLocale, handleSetTimeZone, handleSetTimeZoneFavorites, configLoading, useOnCalendarConfig } = useConfig()

  const [locale, setLocale] = useState(config.calendar_locale || Intl.DateTimeFormat().resolvedOptions().locale)
  const [timeZone, setTimeZone] = useState(config.calendar_time_zone || Temporal.Now.timeZoneId())
  const [timeZoneFavorites, setTimeZoneFavorites] = useState(config.calendar_time_zones_list? JSON.parse(config.calendar_time_zones_list)[0] : [])
  const [timeZonesOptions, setTimeZonesOptions] = useState(timeZoneList)

  useEffectAfterMonting([timeZoneFavorites], () => setTimeZonesOptions((list) => filterExcludedItems(list, timeZoneFavorites)))

/*   useOnCalendarConfig(() => {
    setLocale(config.calendar_locale)
    setTimeZone(config.calendar_time_zone)
    setTimeZoneFavorites(JSON.parse(config.calendar_time_zones_list)[0])
  }) */

  const locales = ['es-ES', 'us-US']

  const countryTimeZoneList = useMemo(() => getCountryTimeZoneList('es'), [])

  const handleTimeZoneSearch = (e) => {
    if (e.target.value == "") {
      setTimeZonesOptions(filterExcludedItems(timeZoneList, timeZoneFavorites))
    } else {
      const results = countryTimeZoneList.filter((timeZone) => {
        const normalizedTimeZone = normalizeText(timeZone[1]);
        const inputs = normalizeText(e.target.value).split(" ").filter(Boolean);

        const isTimeZone = inputs.every((input) =>
          normalizedTimeZone.includes(input)
        );

        return isTimeZone;
      });
      setTimeZonesOptions(filterExcludedItems(results.map((item) => item[0]), timeZoneFavorites))
    }
  }

  return (
    <>
      <ConfigHeading text={'Calendario y Hora'}/>
      <Loading isLoading={configLoading} color={"bg-primary-dark"}>
        <ConfigElement name={'Local'}>
          <ConfigSelectFromList
            selection={config.calendar_locale || Intl.DateTimeFormat().resolvedOptions().locale}
            elements={locales}
            handleSubmit={handleSetLocale}/>
        </ConfigElement>
        <ConfigElement name={'Zona horaria'}>
          <ConfigSelectFromList 
            selection={config.calendar_time_zone || Temporal.Now.timeZoneId()}
            elements={timeZonesOptions}
            handleSubmit={handleSetTimeZone}>
            <div className="m-2 w-full" onClick={(e) => e.stopPropagation()}>
              <SearcherBarOnChange placeholder={"Zona horaria"} handleSubmit={handleTimeZoneSearch}/>
            </div>
          </ConfigSelectFromList>
        </ConfigElement>
        <ConfigElement name={'Zonas horarias disponible en calendario'}>
          <ConfigMultipleSelect
            selection={config.calendar_time_zones_list? JSON.parse(config.calendar_time_zones_list)[0] : []}
            elements={timeZonesOptions}
            handleSubmit={handleSetTimeZoneFavorites}>
              <div className="m-2 w-full" onClick={(e) => e.stopPropagation()}>
                <SearcherBarOnChange placeholder={"Zona horaria"} handleSubmit={handleTimeZoneSearch}/>
              </div>
          </ConfigMultipleSelect>
        </ConfigElement>
      </Loading>
    </>
  );
};
