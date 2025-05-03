import React, { useEffect, useState } from 'react';
import { EditInput } from './EditInput';
import { MydataRow } from './MydataRow';
import { MyDataSaveButton } from './MyDataSaveButton';
import { useData } from '../../contexts/DataContext';
import { useUser } from '../../contexts/UserContext';

export const LastNameModule = () => {
  
  const { user } = useData();

  const { lastName, setLastName, isLoadingLastName } = useUser();

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (lastName !== user.last_name) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [lastName, user.last_name])

  return (
    <>
      <MydataRow labelText={'Apellido'}>
        <EditInput type={'text'} maxLength={30} value={lastName} setValue={setLastName} />
      </MydataRow>
      {
        hasChanged ?
          <>
            <MyDataSaveButton isLoading={isLoadingLastName} />
          </> :
          <></>
      }
    </>
  )
}
