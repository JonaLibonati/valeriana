import React, { useContext } from 'react';
import { SelfUser } from '../../api/selfUser';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { TimeContext } from '../../contexts/TimeContext';
import { dayLongAbbr, monthAbbr } from '../../helpers/time';

export const UserDashboard = () => {

  const { firstName, user } = useContext(UserContext);
  const { date, day, month, hours, minutes } = useContext(TimeContext);

  const handleLogout = async () => {
    await SelfUser.logout()
  }

  return (
    <div className='grid grid-cols-[280px_minmax(0,1fr)] grid-rows-[60px_minmax(0,1fr)] min-h-dvh'>
      <nav className='row-span-2 bg-tertiary-light'>
        <div className='relative grid grid-rows-[fit-content(0)_1fr_fit-content(0)] gap-2 h-full p-4 text-tertiary-dark'>
          <h1 className='sacramento text-[40px] text-tertiary-dark'>Valeriana</h1>
          <div className='text-xl'>
            <Link to={'home'} className='block mb-2 font-extralight'>Inicio</Link>
            <Link to={'appointments'} className='block mb-2 font-extralight'>Agenda</Link>
            {
              user.role.current === 'patient'?
                <>
                  <Link to={'psychologist'} className='block mb-2 font-extralight'>Mi psicolog@</Link>
                </> :
              (user.role.current === 'psychologist')?
                <Link to={'patients'} className='block mb-2 font-extralight'>Mis Pacientes</Link> :
                <></>
            }
            <Link to={'mydata'} className='block mb-2 font-extralight'>Mis datos</Link>
            <Link to={'config'} className='block mb-2 font-extralight'>Configuración</Link>
            <Link to={'appointments'} onClick={() => handleLogout()} className='block mb-2 font-extralight'>Cerrar sesión</Link>
          </div>
        </div>
      </nav>
      <div className='bg-primary-light'>
        <div className='flex justify-between mt-4 ml-4 mr-4 pb-1 border-b-2 border-secondary-base'>
          <p className='text-lg text-secondary-base'>Hola <span className='text-primary-dark'>{firstName}</span> !</p>
          <p className='text-lg text-secondary-base'>
            <span className='text-sm'>{dayLongAbbr[day]} {date} {monthAbbr[month]}</span>
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

