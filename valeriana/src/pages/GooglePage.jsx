import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import { Loading } from '../components/globalComponents/loading/Loading';
import { FilledButton } from '../components/globalComponents/buttons/FilledButton';
import { useGoogle } from '../contexts/GoogleContext';

export const GooglePage = () => {

    const { handleSyncCallback, handleCreateCalendar, syncResult, isSyncLoading, isSyncSuccessful, createCalendarRes, isCalendarSuccessful, isCalendarLoading } = useGoogle()

    useEffect( () => {
        const paramsString = window.location.href.split('?')[1];
        const searchParams = new URLSearchParams(paramsString);

        if (searchParams.get('code') && searchParams.get('scope')) {
            (async ( ) => {
                await handleSyncCallback(searchParams.get('code'), searchParams.get('scope'))
                await handleCreateCalendar()
            })()
        }
    }, [])

  return (
    <div className='bg-primary-light text-tertiary-dark h-screen'>
        <h1 className='p-4 sacramento text-[40px] '>Valeriana</h1>
        <div className='bg-secondary-light p-4 rounded-md max-w-[520px] m-auto'>
            <div className='flex flex-wrap'>
                <p className='p-4 basis-full text-center text-xl'>Sincronizando con google</p>
                <Loading isLoading={isSyncLoading} color={"bg-primary-dark"}>
                    <p className={`${isSyncSuccessful? 'text-green-500' : 'text-red-500'} basis-full text-center text-xl`}>
                        {
                            isSyncSuccessful? 'Sicronizacion completada' :
                            syncResult == 'ER_GRANT_ALREADY_OBTAINED_BUT_INVALID_REFRESH_TOKEN'? <>Un error inesperado ha ocurrido. Por favor ingresa a <a className='whitespace-nowrap text-app-black hover:underline' href='https://myaccount.google.com/connections' target="_blank">myaccount.google.com/connections</a>, elimina todas las conexiones con Valeriana e intente nuevamente.</> :
                            'Error en la sincronizacion'
                        }
                    </p>
                </Loading>
                {isSyncSuccessful?
                <>
                    <p className='p-4 basis-full text-center text-xl'>Creando calendario de google</p>
                    <Loading isLoading={isCalendarLoading} color={"bg-primary-dark"}>
                        <p className={`${isCalendarSuccessful? 'text-green-500' : 'text-red-500'} basis-full text-center text-xl`}>
                            {
                                createCalendarRes == "GOOGLE_CALENDAR_ALREADY_CREATED"? 'El calendario ya estaba creado' :
                                createCalendarRes == "GOOGLE_CALENDAR_CREATED_AND_ID_SAVED"? 'El calendario fue guardado y creado con exito' :
                                createCalendarRes == "ER_GOOGLE_CALENDAR_CREATED_BUT_ID_NOT_SAVED"? 'El calendario fue creado pero no se logro guardar el ID en nuestra base de datos.' :
                                'Un error inesperado a ocurrido.'
                            }
                        </p>
                    </Loading>
                </> : <></>}
                <FilledButton className='mt-6'>
                    <Link className='text-center' to='/app/user/appointments' >Volver</Link>
                </FilledButton>
            </div>
        </div>
    </div>
  )
}
