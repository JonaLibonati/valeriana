import React, { useContext, useEffect, useState } from 'react';
import { EditInput } from './EditInput';
import { UserContext } from '../../contexts/UserContext';
import { MydataRow } from './MydataRow';
import { MyDataSaveButton } from './MyDataSaveButton';

export const FirstNameModule = () => {

  const { firstName, user, isLoadingFirstName } = useContext(UserContext);

  const [hasChanged, setHasChanged] = useState(false);

  const { first_name } = user.data.current;

  useEffect(() => {
    if (firstName !== first_name) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [firstName, first_name])

  return (
    <>
      <MydataRow labelText={'Nombre'}>
        <EditInput type={'text'} maxLength={30} value={firstName} setValue={user.setFirstName} />
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
