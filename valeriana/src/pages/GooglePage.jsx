import React, {useEffect, useRef, useState} from 'react'
import { Loading } from '../components/globalComponents/loading/Loading';

export const GooglePage = () => {

    const firstRender = useRef(true)

    const [isSyncSuccessful, setIsSyncSuccessful] = useState(false);
    const [isCalendarSuccessful, setIsCalendarSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        if (firstRender.current) {
            const paramsString = window.location.href.split('?')[1];
            const searchParams = new URLSearchParams(paramsString);

            const handleSync = async (code, scope) => {
                setIsLoading(true)

                const options = {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({code, scope}),
                  };
                const res = await fetch("/v1/google/oauthcallback", options);
                const body = await res.json();

                if (res.status == 200 && (body.code == 'TOKENS_SAVED' || body.code == 'TOKENS_UPDATED')) {
                    console.info(body.code)
                    setIsSyncSuccessful(true)
                } else {
                    console.error(body.code)
                    setIsSyncSuccessful(false)
                }

                setIsLoading(false)
            }

            handleSync(searchParams.get('code'), searchParams.get('scope'), setIsLoading)
        }

        firstRender.current = false

    }, [])

    

  return (
    <div className='bg-primary-light text-tertiary-dark h-screen'>
        <h1 className='p-4 sacramento text-[40px] '>Valeriana</h1>
        <div className='flex flex-wrap'>
            <p className='p-4 basis-full text-center text-xl'>Sincronizando con google</p>
            <Loading isLoading={isLoading} color={"bg-primary-dark basis-full"}>
                <p className={`${isSyncSuccessful? 'text-green-500' : 'text-red-500'} basis-full text-center text-xl`}>
                    {isSyncSuccessful? 'Sicronizacion completada' : 'Error en la sincronizacion'}
                </p>
            </Loading>
        </div>
        
    </div>
  )
}
