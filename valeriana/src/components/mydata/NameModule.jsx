import React, { useContext, useEffect, useState } from 'react'
import { EditInput } from './EditInput';
import { FilledButton } from '../globalComponents/buttons/FilledButton';
import { UserContext } from '../../contexts/UserContext';
import { UserHelpers } from '../../helpers/userHelpers';
import { MydataRow } from './MydataRow';

export const NameModule = () => {

  const { userData, userName, firstName, lastName, setUserName, setFirstName, setLastName } = useContext(UserContext);

  const [hasChanged, setHasChanged] = useState(false);

  const { user_name, first_name, last_name } = userData.current;

  useEffect(() => {
    if (userName !== user_name || firstName !== first_name || lastName !== last_name) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [userName, firstName, lastName])

  return (
    <>
      <MydataRow labelText={'Nombre de usuario'}>
        <EditInput type={'text'} maxLength={20} value={userName} setValue={setUserName} />
      </MydataRow>
      <MydataRow labelText={'Nombre'}>
        <EditInput type={'text'} maxLength={30} value={firstName} setValue={setFirstName} />
      </MydataRow>
      <MydataRow labelText={'Apellido'}>
        <EditInput type={'text'} maxLength={30} value={lastName} setValue={setLastName} />
      </MydataRow>
      {
        hasChanged ?
          <>
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
