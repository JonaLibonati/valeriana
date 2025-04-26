import { ConfigCalendar } from "../components/config/ConfigCalendar"
import { ConfigGoogle } from "../components/config/ConfigGoogle"
import { ConfigStyle } from "../components/config/ConfigStyle"
import { Section } from "../components/globalComponents/layout/Section"

export const ConfigPage = () => {
  return (
    <>
      <Section className={'mb-2'}>
        <ConfigStyle />
      </Section>
      <Section className={'mb-2'}>
        <ConfigGoogle />
      </Section>
      <Section className={'mb-2'}>
        <ConfigCalendar />
      </Section>
    </>
  )
}
