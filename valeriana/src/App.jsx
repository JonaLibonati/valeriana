
import { Calendar } from "./components/calendar/Calendar"
import { DateProvider } from "./contexts/DateContext"

function App() {

  return (
    <DateProvider>
      <Calendar />
    </DateProvider>
  )
}

export default App
