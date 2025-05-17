import { ConfigCalendar } from "../components/config/ConfigCalendar"
import { ConfigGoogle } from "../components/config/ConfigGoogle"
import { ConfigStyle } from "../components/config/ConfigStyle"
import { Section } from "../components/globalComponents/layout/Section"
import { GoogleProvider } from "../contexts/GoogleContext"

export const ConfigPage = () => {
  return (
    <>
      <Section className={'mb-2'}>
        <ConfigStyle />
      </Section>
      <Section className={'mb-2'}>
        <GoogleProvider>
          <ConfigGoogle />
        </GoogleProvider>
      </Section>
      <Section className={'mb-2'}>
        <ConfigCalendar />
      </Section>
    </>
  )
}
