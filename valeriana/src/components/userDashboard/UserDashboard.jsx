import React, { useEffect, useState } from 'react';
import { SelfUser } from '../../api/selfUser';
import { ThemeSelector } from '../globalComponents/themeSelector/ThemeSelector';
import { LogoutIcon } from '../globalComponents/icons/LogoutIcon';
import { ButtonWithIcon } from '../globalComponents/buttons/ButtonWithIcon';
import { ConfigIcon } from '../globalComponents/icons/ConfigIcon';
import { PersonIcon } from '../globalComponents/icons/personIcon';
import { Link, Outlet } from 'react-router-dom';
import { LinkWithIcon } from '../globalComponents/buttons/LinkWithIcon';

export const UserDashboard = () => {

  const [firstName, setFirstName] = useState(undefined);

  useEffect(() => {

    SelfUser.getAll()
      .then(({ res, body }) => {
        console.log(res)
        console.log(body)
        setFirstName(body.first_name);
      })
      .catch(console.error)

  }, [])

  const handleLogout = async () => {
    await SelfUser.logout()
  }

  return (
    <div className='grid grid-cols-[280px_minmax(0,1fr)] grid-rows-[40px_minmax(0,1fr)] h-dvh'>
      <div className='row-span-2 bg-tertiary-light'>
        <div className='relative grid grid-rows-[fit-content(0)_1fr_fit-content(0)] gap-2 h-full p-4 text-tertiary-dark'>
          <h1 className='sacramento text-[40px] text-tertiary-dark'>Valeriana</h1>
          <div className='text-xl'>
            <Link to={'home'} className='block mb-2'>Inico</Link>
            <Link to={'appointments'} className='block mb-2'>Agenda</Link>
            <Link to={'patients'} className='block mb-2'>Pacientes</Link>
          </div>
          <div className='mt-auto mb-auto'>
            <LinkWithIcon className={'mt-2'} text={'Mis datos'} to={'./mydata'}>
              <PersonIcon className={'inline mr-3 size-7'} />
            </LinkWithIcon>
            <LinkWithIcon className={'mt-2'} text={'Configuración'} to={'./config'}>
              <ConfigIcon className={'inline mr-3 size-7'} />
            </LinkWithIcon>
            <ButtonWithIcon className={'mt-2 mb-2'} text={'Cerrar sesión'} onClick={() => handleLogout()}>
              <LogoutIcon className={'inline mr-3 size-7'} />
            </ButtonWithIcon>
          </div>
        </div>
      </div>
      <div className='bg-primary-light'>
        <p className='ml-4 mt-4 text-lg text-secondary-base'>Hola <span className='text-primary-dark'>{firstName}</span> !</p>
      </div>
      <div className='bg-primary-light text-tertiary-dark'>
        <div className='p-8'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

