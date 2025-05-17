import { useGoogle } from "../../contexts/GoogleContext";
import { OutlineButton } from "../globalComponents/buttons/OutlineButton"
import { GoogleCalendarIcon } from "../globalComponents/icons/GoogleCalendarIcon"
import { Loading } from "../globalComponents/loading/Loading"

export const AppointGoogleCalendar = () => {

  const { handleSyncCalendar, isGoogleSync, isLoading } = useGoogle();

  return (
    <div >
      <Loading isLoading={isLoading} color={"bg-primary-dark mt-7 mb-7"}>
        {isGoogleSync ?
          <div className="grid content-center w-full p-4 pt-1 pb-1 mt-1 mb-1 rounded-md text-tertiary-dark outline outline-green-500">
            <div className="flex">
              <GoogleCalendarIcon className={'size-12 mr-2'} />
              Google calendar Sincronizado
            </div>
          </div> :
          <OutlineButton>
            <div className="flex" onClick={handleSyncCalendar}>
              <GoogleCalendarIcon className={'size-12 mr-2'} />
              Sincronizar Google Calendar
            </div>
          </OutlineButton>
        }
      </Loading>
    </div>
  )
}
