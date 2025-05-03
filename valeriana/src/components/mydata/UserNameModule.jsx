import React, { useEffect, useState } from 'react';
import { EditInput } from './EditInput';
import { useUser } from '../../contexts/UserContext';
import { MydataRow } from './MydataRow';
import { MyDataSaveButton } from './MyDataSaveButton';
import { useData } from '../../contexts/DataContext';

export const UserNameModule = () => {

  const { userName, setUserName, isLoadingUserName } = useUser();

  const { user } = useData();

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (userName !== user.user_name) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [userName, user.user_name])

  return (
    <>
      <MydataRow labelText={'Nombre de usuario'}>
        <EditInput type={'text'} maxLength={20} value={userName} setValue={setUserName} />
      </MydataRow>
      {
        hasChanged ?
          <>
            <MyDataSaveButton isLoading={isLoadingUserName} />
          </> :
          <></>
      }
    </>
  )
}
