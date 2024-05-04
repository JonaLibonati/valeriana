import React, { useState } from 'react';
import { MydataModule } from '../components/mydata/MydataModule';
import { NameModule } from '../components/mydata/NameModule';
import { EmailModule } from '../components/mydata/EmailModule';
import { PasswordModule } from '../components/mydata/PasswordModule';
import { UserProvider } from '../contexts/UserContext';
import { MyDataHelpers } from '../helpers/myDataHelpers';


export const MydataPage = () => {

  const [isLoadingNameModule, setIsLoadingNameModule] = useState(false);
  const [isLoadingEmailModule, setIsLoadingEmailModule] = useState(false);

  return (
    <UserProvider>
      <div className='grid grid-rows-[repeat(3,fit-content(0))] gap-3'>
        <MydataModule handleSubmit={MyDataHelpers.handleNameModule} setIsLoading={setIsLoadingNameModule}>
          <NameModule isLoading={isLoadingNameModule}/>
        </MydataModule>
        <MydataModule handleSubmit={MyDataHelpers.handleEmailModule} setIsLoading={setIsLoadingEmailModule}>
          <EmailModule isLoading={isLoadingEmailModule}/>
        </MydataModule>
        <div className="p-8 rounded-md bg-tertiary-light">
          <PasswordModule />
        </div>
      </div>
    </UserProvider>
  )
}
