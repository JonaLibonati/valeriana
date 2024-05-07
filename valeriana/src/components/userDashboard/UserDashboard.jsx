import React, { useContext } from 'react';
import { SelfUser } from '../../api/selfUser';
import { LogoutIcon } from '../globalComponents/icons/LogoutIcon';
import { ButtonWithIcon } from '../globalComponents/buttons/ButtonWithIcon';
import { ConfigIcon } from '../globalComponents/icons/ConfigIcon';
import { PersonIcon } from '../globalComponents/icons/PersonIcon';
import { Link, Outlet } from 'react-router-dom';
import { LinkWithIcon } from '../globalComponents/buttons/LinkWithIcon';
import { UserContext } from '../../contexts/UserContext';
import { TimeContext } from '../../contexts/TimeContext';
import { dayAbbr, monthAbbr } from '../../helpers/time';

export const UserDashboard = () => {

  const { firstName } = useContext(UserContext);
  const { date, day, month, hours, minutes } = useContext(TimeContext);

  const handleLogout = async () => {
    await SelfUser.logout()
  }

  return (
    <div className='grid grid-cols-[280px_minmax(0,1fr)] grid-rows-[60px_minmax(0,1fr)] h-dvh'>
      <nav className='row-span-2 bg-tertiary-light'>
        <div className='relative grid grid-rows-[fit-content(0)_1fr_fit-content(0)] gap-2 h-full p-4 text-tertiary-dark'>
          <h1 className='sacramento text-[40px] text-tertiary-dark'>Valeriana</h1>
          <div className='text-xl'>
            <Link to={'home'} className='block mb-2 font-extralight'>Inico</Link>
            <Link to={'appointments'} className='block mb-2 font-extralight'>Agenda</Link>
            <Link to={'patients'} className='block mb-2 font-extralight'>Pacientes</Link>
          </div>
          <div className='mt-auto mb-auto'>
            <LinkWithIcon className={'mt-3 font-extralight'} text={'Mis datos'} to={'./mydata'}>
              <PersonIcon className={'inline mr-3 size-7'} />
            </LinkWithIcon>
            <LinkWithIcon className={'mt-3 font-extralight'} text={'Configuración'} to={'./config'}>
              <ConfigIcon className={'inline mr-3 size-7'} />
            </LinkWithIcon>
            <ButtonWithIcon className={'mt-3 mb-2 font-extralight'} text={'Cerrar sesión'} onClick={() => handleLogout()}>
              <LogoutIcon className={'inline mr-3 size-7'} />
            </ButtonWithIcon>
          </div>
        </div>
      </nav>
      <div className='bg-primary-light'>
        <div className='flex justify-between mt-4 ml-4 mr-4 pb-1 border-b-2 border-secondary-base'>
          <p className='text-lg text-secondary-base'>Hola <span className='text-primary-dark'>{firstName}</span> !</p>
          <p className='text-lg text-secondary-base'>
            <span className='text-sm'>{dayAbbr[day]} {date} {monthAbbr[month]}</span>
            <span className='text-primary-dark'> {hours}</span>:<span className='text-primary-dark'>{minutes}</span>
          </p>
        </div>
      </div>
      <div className='bg-primary-light text-tertiary-dark'>
        <div className='p-8'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

