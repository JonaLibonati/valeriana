import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { MydataModule } from "../components/mydata/MydataModule";
import { UserNameModule } from "../components/mydata/UserNameModule";
import { EmailModule } from "../components/mydata/EmailModule";
import { PasswordModule } from "../components/mydata/PasswordModule";
import { FirstNameModule } from "../components/mydata/FirstNameModule";
import { LastNameModule } from "../components/mydata/LastNameModule";
import { Section } from "../components/globalComponents/layout/Section";
import { Column } from "../components/globalComponents/layout/Column";

export const MydataPage = () => {
  const { UserHelpers } = useContext(UserContext);

  return (
    <Column>
      <Section>
        <Column>
          <MydataModule handleSubmit={UserHelpers.handleNewUserName}>
            <UserNameModule />
          </MydataModule>
          <MydataModule handleSubmit={UserHelpers.handleNewFirstName}>
            <FirstNameModule />
          </MydataModule>
          <MydataModule handleSubmit={UserHelpers.handleNewLastName}>
            <LastNameModule />
          </MydataModule>
        </Column>
      </Section>
      <Section>
        <Column>
          <MydataModule handleSubmit={UserHelpers.handleNewEmail}>
            <EmailModule />
          </MydataModule>
        </Column>
      </Section>
      <Section>
        <PasswordModule />
      </Section>
    </Column>
  );
};
