import React, { useContext, useEffect, useState } from 'react';
import { EditInput } from './EditInput';
import { UserContext } from '../../contexts/UserContext';
import { MydataRow } from './MydataRow';
import { MyDataSaveButton } from './MyDataSaveButton';

export const UserNameModule = () => {

  const { userName, isLoadingUserName, user } = useContext(UserContext);

  const [hasChanged, setHasChanged] = useState(false);

  const { user_name } = user.data.current;

  useEffect(() => {
    if (userName !== user_name) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [userName, user_name])

  return (
    <>
      <MydataRow labelText={'Nombre de usuario'}>
        <EditInput type={'text'} maxLength={20} value={userName} setValue={user.setUserName} />
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
