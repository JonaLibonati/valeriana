import React, { useContext, useEffect, useState } from 'react'
import { EditInput } from './EditInput';
import { FilledButton } from '../globalComponents/buttons/FilledButton';
import { UserContext } from '../../contexts/UserContext';

export const EmailModule = () => {

  const { userData, email, setEmail } = useContext(UserContext);

  const [hasChanged, setHasChanged] = useState(false);

  const { email_address } = userData.current;

  useEffect(() => {
    if (email !== email_address) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [email])

  return (
    <>
      <div className="inline text-secondary-base border-r-2 border-secondary-base">Email</div>
      <div className="inline relative ml-2">
        <EditInput type={"email"} value={email} setValue={setEmail} />
      </div>
      {
        hasChanged ?
          <>
            <div className="inline text-secondary-base border-r-2 border-secondary-base">Contraseña</div>
            <div className="inline relative ml-2">
              <EditInput type={'password'} />
            </div>
            <div className='col-span-2'>
              <FilledButton>
                <input className='text-md' value="Guardar" type="submit" />
              </FilledButton>
            </div>
          </> :
          <></>
      }
    </>
  )
}
