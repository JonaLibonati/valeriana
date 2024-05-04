import React, { useContext, useEffect, useState } from 'react'
import { EditInput } from './EditInput';
import { UserContext } from '../../contexts/UserContext';
import { MyDataSaveButton } from './MyDataSaveButton';

export const EmailModule = ({ isLoading }) => {

  const { userData, email, setEmail } = useContext(UserContext);

  const [hasChanged, setHasChanged] = useState(false);

  const { email_address } = userData;

  useEffect(() => {
    if (email !== email_address) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [email, userData])

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
              <EditInput type={'password'} setValue={() => {}} />
            </div>
            <MyDataSaveButton isLoading={isLoading} />
          </> :
          <></>
      }
    </>
  )
}
