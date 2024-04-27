import React, { useContext, useState } from 'react';
import { MydataModule } from '../components/mydata/MydataModule';
import { NameModule } from '../components/mydata/NameModule';
import { EmailModule } from '../components/mydata/EmailModule';
import { PasswordModule } from '../components/mydata/PasswordModule';
import { UserProvider } from '../contexts/UserContext';
import { MyDataHelpers } from '../helpers/myDataHelpers';
import { ErrorContext } from '../contexts/ErrorContext';

export const MydataPage = () => {

  const { setErrorText, setErrorPopUp } = useContext(ErrorContext);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <UserProvider>
      <div className='grid grid-rows-[repeat(3,fit-content(0))] gap-3'>
        <MydataModule handleSubmit={MyDataHelpers.handleNameModule}>
          <NameModule />
        </MydataModule>
        <MydataModule >
          <EmailModule />
        </MydataModule>
        <div className="p-8 rounded-md bg-tertiary-light">
          <PasswordModule />
        </div>
      </div>
    </UserProvider>
  )
}
