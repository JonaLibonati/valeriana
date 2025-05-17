import React, { useContext } from 'react';
import { User } from '../../api/user';
import { Link, Outlet } from 'react-router-dom';
import { TimeContext } from '../../contexts/TimeContext';
import { dayLongAbbr, monthAbbr } from '../../helpers/time';
import { useData } from '../../contexts/DataContext';
import { Loading } from '../globalComponents/loading/Loading';

export const UserDashboard = () => {

  const { date, day, month, hours, minutes } = useContext(TimeContext);

  const { user, firstLoading } = useData()

  const handleLogout = async () => {
    await User.logout()
  }

  return (
    <div className='grid grid-cols-[220px_minmax(0,1fr)] grid-rows-[60px_minmax(0,1fr)] min-h-dvh'>
      <nav className='row-span-2 bg-tertiary-light'>
        <div className='relative grid grid-rows-[fit-content(0)_1fr_fit-content(0)] gap-2 h-full p-4 text-tertiary-dark'>
          <h1 className='sacramento text-[40px] text-tertiary-dark'>Valeriana</h1>
          <div className='text-xl'>
            <Loading isLoading={firstLoading} color={"bg-primary-dark"}>
              <Link to={'home'} className='block mb-2 font-extralight'>Inicio</Link>
              <Link to={'appointments'} className='block mb-2 font-extralight'>Agenda</Link>
              {
                user.role_name === 'patient'?
                  <>
                    <Link to={'psychologist'} className='block mb-2 font-extralight'>Mi psicolog@</Link>
                  </> :
                (user.role_name === 'psychologist')?
                  <Link to={'patients'} className='block mb-2 font-extralight'>Mis Pacientes</Link> :
                  <></>
              }
              <Link to={'mydata'} className='block mb-2 font-extralight'>Mis datos</Link>
              <Link to={'config'} className='block mb-2 font-extralight'>Configuración</Link>
            </Loading>
            <Link to={'appointments'} onClick={() => handleLogout()} className='block mb-2 font-extralight'>Cerrar sesión</Link>
          </div>
        </div>
      </nav>
      <div className='bg-primary-light'>
        <div className='flex justify-between mt-4 ml-4 mr-4 pb-1 border-b-2 border-secondary-base'>
          <p className='text-lg text-secondary-base'>Hola <span className='text-primary-dark'>{user.first_name}</span> !</p>
          <p className='text-lg text-secondary-base'>
            <span className='text-sm'>{dayLongAbbr[day]} {date} {monthAbbr[month]}</span>
            <span className='text-primary-dark'> {hours}</span>:<span className='text-primary-dark'>{minutes}</span>
          </p>
        </div>
      </div>
      <div className='bg-primary-light text-tertiary-dark'>
        <div className='p-8'>
          <Loading isLoading={firstLoading} color={"bg-primary-dark"}>
            <Outlet />
          </Loading>
        </div>
      </div>
    </div>
  )
}

