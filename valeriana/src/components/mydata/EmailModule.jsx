import React, { useContext, useEffect, useState } from 'react'
import { EditInput } from './EditInput';
import { UserContext } from '../../contexts/UserContext';
import { MyDataSaveButton } from './MyDataSaveButton';

export const EmailModule = () => {

  const { user, email, isLoadingEmail } = useContext(UserContext);

  const [hasChanged, setHasChanged] = useState(false);

  const { email_address } = user.data.current;

  useEffect(() => {
    if (email !== email_address) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [email, email_address])

  return (
    <>
      <div className="inline text-secondary-base border-r-2 border-secondary-base">Email</div>
      <div className="inline relative ml-2">
        <EditInput type={"email"} value={email} setValue={user.setEmail} />
      </div>
      {
        hasChanged ?
          <>
            <div className="inline text-secondary-base border-r-2 border-secondary-base">Contraseña</div>
            <div className="inline relative ml-2">
              <EditInput type={'password'} setValue={() => {}} />
            </div>
            <MyDataSaveButton isLoading={isLoadingEmail} />
          </> :
          <></>
      }
    </>
  )
}
