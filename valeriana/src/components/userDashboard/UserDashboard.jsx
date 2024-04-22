import React, { useEffect } from 'react';
import { SelfUser } from '../../api/selfUser';
import { ThemeSelector } from '../globalComponents/themeSelector/ThemeSelector';

export const UserDashboard = () => {

  useEffect(() => {

    SelfUser.getAll()
      .then(({ res, body }) => {
        console.log(res)
        console.log(body)
      })
      .catch(console.error)

  }, [])


  return (
    <div className='grid grid-cols-[280px_minmax(0,1fr)] grid-rows-[40px_minmax(0,1fr)] h-dvh'>
      <div className='row-span-2 bg-tertiary-light'>
        <div className='relative grid grid-rows-[fit-content(0)_1fr_40px] h-full p-4 text-tertiary-dark'>
          <h1 className='sacramento text-[40px] text-tertiary-dark'>Valeriana</h1>
          <div>holas</div>
          <div className='mt-auto mb-auto'>
            <button className='flex ' onClick={async () => await SelfUser.logout()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="inline mr-2 size-7" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
              </svg>
              <p className='pt-[1px] inline'>Cerrar sesión</p>
            </button>
          </div>
        </div>
      </div>
      <div className='bg-primary-light'>
        <ThemeSelector />
      </div>
      <div className='bg-primary-light text-tertiary-dark'></div>
    </div>
  )
}

