import React, { useContext, useEffect, useState } from 'react';
import { EditInput } from './EditInput';
import { UserContext } from '../../contexts/UserContext';
import { MydataRow } from './MydataRow';
import { MyDataSaveButton } from './MyDataSaveButton';

export const NameModule = ({ isLoading }) => {

  const { userData, userName, firstName, lastName, setUserName, setFirstName, setLastName } = useContext(UserContext);

  const [hasChanged, setHasChanged] = useState(false);

  const { user_name, first_name, last_name } = userData;

  useEffect(() => {
    if (userName !== user_name || firstName !== first_name || lastName !== last_name) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [userName, firstName, lastName, userData])

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
            <MyDataSaveButton isLoading={isLoading} />
          </> :
          <></>
      }
    </>
  )
}
