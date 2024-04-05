import { DateProvider } from "./contexts/DateContext";
import { ValerianaRouter } from "./router/ValerianaRouter";

function App() {

  return (
    <DateProvider>
      <ValerianaRouter></ValerianaRouter>
    </DateProvider>
  )
}

export default App
