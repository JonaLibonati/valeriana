import React, {useState, useEffect, useContext} from 'react';
import { ConfigElement } from './ConfigElement';
import { ConfigAction } from './ConfigAction';
import { google } from '../../api/google';
import { CopyIcon } from '../globalComponents/icons/CopyIcon';
import { PopUpContext } from '../../contexts/PopUpContext';
import { Loading } from '../globalComponents/loading/Loading';
import { ConfigHeading } from './ConfigHeading';

export const ConfigGoogle = () => {

    const [calendarId, setCalendarId] = useState('');

    const [isGoogleSync, setIsGoogleSync] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const { usePopUp } = useContext(PopUpContext)

    useEffect(() => {
        setIsLoading(true)
      google.getCalendar()
        .then(({body}) => {
            console.log(body)
            if (body.code == "GOOGLE_CALENDAR_FOUND_AND_GRANTED") {
                setCalendarId(body.data.id)
                setIsGoogleSync(1)
            } else {
                google.setIsCalendarSync(0)
                setIsGoogleSync(0)
            }

            setIsLoading(false)
        })
        .catch((error) => {
            console.error(error);
    });

    }, [])

    const handleCopy = () => {
        navigator.clipboard.writeText(calendarId)
        usePopUp('El Calendar ID ha sido copiado al portapapeles.', 'success')
    }

    const handleRevoke = () => {
        google.revokeToken()
            .then(({res, body}) => {
                if (body.code == 'GOOGLE_TOKEN_REVOKED') {
                    google.setIsCalendarSync(0)
                    setIsGoogleSync(0)
                } else {
                    google.setIsCalendarSync(1)
                    setIsGoogleSync(1)
                }
                console.log(res, body)
            })
            .catch((error) => {
                console.error(error);
    })};

  return (
    <>
        <ConfigHeading text={'Google Calendar'}/>
        <Loading isLoading={isLoading} color={"bg-primary-dark"}>
            {
                isGoogleSync?
                    <>
                        <ConfigElement name={'Calendar ID'}>
                            <div className='flex items-center truncate'>
                                <p className='w-full truncate'>{calendarId}</p>
                                <div className='cursor-pointer' onClick={handleCopy}>
                                    <CopyIcon className={'size-8 pl-1'} />
                                </div>
                            </div>
                        </ConfigElement>
                        <ConfigAction name={'Resincronizar calendario'} buttonText={'Resincronizar'} action={google.syncCalendar}
                            description={
                                <>
                                    Resincronizar tu calendario puede ser util en los siguientes casos:
                                    <ul className='list-disc list-inside pl-4'>
                                        <li>Si borraste el calendario Valeriana por error y quieres crear uno nuevo.</li>
                                        <li>Si revocaste o se vencieron los permisos otorgados a valeriana</li>
                                        <li>Si no se muestra el calendar ID.</li>
                                    </ul>
                                </>
                            }
                        />
                        <ConfigAction name={'Desincronizar y revocar'} description={<>Si quieres desincronizar y borrar los permisos otorgados a valeriana. (Puedes revisar los permisos manualmente ingresando en <a className='whitespace-nowrap hover:underline' href='https://myaccount.google.com/connections' target="_blank">myaccount.google.com/connections</a>)</>} buttonText={'Revocar'} action={handleRevoke}/>
                    </> :
                    <>
                        <ConfigAction name={'Sincronizar calendario'} buttonText={'Sincronizar'} action={google.syncCalendar} description={'Tu google calendar no esta sincronizado.'}/>
                    </>
            }
        </Loading>
    </>
  )
}
