import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { MydataSection } from '../components/mydata/MydataSection';
import { MydataModule } from '../components/mydata/MydataModule';
import { UserNameModule } from '../components/mydata/UserNameModule';
import { EmailModule } from '../components/mydata/EmailModule';
import { PasswordModule } from '../components/mydata/PasswordModule';
import { FirstNameModule } from '../components/mydata/FirstNameModule';
import { LastNameModule } from '../components/mydata/LastNameModule';


export const MydataPage = () => {

  const { UserHelpers } = useContext(UserContext)

  return (
    <div className='grid grid-rows-[repeat(3,fit-content(0))] gap-3'>
      <MydataSection>
        <MydataModule handleSubmit={UserHelpers.handleNewUserName} >
          <UserNameModule />
        </MydataModule>
        <MydataModule handleSubmit={UserHelpers.handleNewFirstName} >
          <FirstNameModule />
        </MydataModule>
        <MydataModule handleSubmit={UserHelpers.handleNewLastName} >
          <LastNameModule />
        </MydataModule>
      </MydataSection>
      <MydataSection>
        <MydataModule handleSubmit={UserHelpers.handleNewEmail} >
          <EmailModule />
        </MydataModule>
      </MydataSection>
      <MydataSection>
        <PasswordModule />
      </MydataSection>
    </div>
  )
}
