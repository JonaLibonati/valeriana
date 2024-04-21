import React, { useEffect } from 'react';
import { SelfUser } from '../../api/selfUser';
import { ThemeSelector } from '../globalComponents/themeSelector/ThemeSelector';

export const UserDashboard = () => {

  useEffect( () => {

    SelfUser.getAll()
    .then(({res, body}) => {
      console.log(res)
      console.log(body)
    })
    .catch(console.error)

  }, [])


  return (
    <div className='grid grid-cols-[280px_minmax(0,1fr)] grid-rows-[40px_minmax(0,1fr)] h-dvh'>
      <div className='row-span-2 bg-tertiary-light'></div>
      <div className='bg-black'>
        <div><ThemeSelector /></div>
      </div>
      <div className='bg-primary-light'><button onClick={async() => await SelfUser.logout()}>LOG OUT</button></div>
    </div>
  )
}

