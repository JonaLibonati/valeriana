import React, { useEffect, useState } from 'react';
import { EditInput } from './EditInput';
import { useUser } from '../../contexts/UserContext';
import { MydataRow } from './MydataRow';
import { MyDataSaveButton } from './MyDataSaveButton';
import { useData } from '../../contexts/DataContext';

export const FirstNameModule = () => {

  const { firstName, setFirstName, isLoadingFirstName } = useUser();
  
  const { user } = useData();

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (firstName !== user.first_name) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [firstName, user.first_name])

  return (
    <>
      <MydataRow labelText={'Nombre'}>
        <EditInput type={'text'} maxLength={30} value={firstName} setValue={setFirstName} />
      </MydataRow>
      {
        hasChanged ?
          <>
            <MyDataSaveButton isLoading={isLoadingFirstName} />
          </> :
          <></>
      }
    </>
  )
}
