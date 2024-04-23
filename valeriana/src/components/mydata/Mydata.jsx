import React, { useEffect, useState } from 'react'
import { SelfUser } from '../../api/selfUser';

export const Mydata = () => {

  const [userName, setUserName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {

    SelfUser.getAll()
      .then(({ body }) => {
        setUserName(body.user_name);
        setFirstName(body.first_name);
        setLastName(body.last_name);
        setEmail(body.email_address);
      })
      .catch(console.error)

  }, [])

  return (
    <div className='grid grid-rows-[repeat(3,fit-content(0))] gap-3'>
      <div className="grid grid-cols-[200px_1fr] p-8 gap-6 rounded-md bg-tertiary-light">
        <div className="inline text-secondary-base border-r-2 border-secondary-base">Nombre de usuario</div>
        <div className="inline relative ml-3 text-primary-dark">{userName}</div>
        <div className="inline text-secondary-base border-r-2 border-secondary-base">Nombre</div>
        <div className="inline relative ml-3 text-primary-dark">{firstName}</div>
        <div className="inline text-secondary-base border-r-2 border-secondary-base">Apellido</div>
        <div className="inline relative ml-3 text-primary-dark">{lastName}</div>
      </div>
      <div className="grid grid-cols-[200px_1fr] p-8 gap-6 rounded-md bg-tertiary-light">
        <div className="inline text-secondary-base border-r-2 border-secondary-base">Email</div>
        <div className="inline relative ml-3 text-primary-dark">{email}</div>
      </div>
      <div className="p-8 rounded-md bg-tertiary-light">
        <button
          className="text-tertiary-dark"
        >
          Cambiar contraseña
        </button>
      </div>
    </div>
  )
}
