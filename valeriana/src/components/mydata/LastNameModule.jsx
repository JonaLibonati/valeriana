import React, { useContext, useEffect, useState } from 'react';
import { EditInput } from './EditInput';
import { UserContext } from '../../contexts/UserContext';
import { MydataRow } from './MydataRow';
import { MyDataSaveButton } from './MyDataSaveButton';

export const LastNameModule = () => {

  const { lastName, user, isLoadingLastName } = useContext(UserContext);

  const [hasChanged, setHasChanged] = useState(false);

  const { last_name } = user.data.current;

  useEffect(() => {
    if (lastName !== last_name) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [lastName, last_name])

  return (
    <>
      <MydataRow labelText={'Apellido'}>
        <EditInput type={'text'} maxLength={30} value={lastName} setValue={user.setLastName} />
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
