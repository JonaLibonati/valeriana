import React, { useEffect, useState } from "react";
import { EditInput } from "./EditInput";
import { MyDataSaveButton } from "./MyDataSaveButton";
import { MydataRow } from "./MydataRow";
import { useUser } from "../../contexts/UserContext";
import { useData } from "../../contexts/DataContext";

export const EmailModule = () => {

  const { user } = useData();

  const { email, setEmail, isLoadingEmail } = useUser();

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    if (email !== user.email_address) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [email, user.email_address]);

  return (
    <>
      <MydataRow labelText={"Email"}>
        <EditInput type={"email"} value={email} setValue={setEmail} />
      </MydataRow>

      {hasChanged ? (
        <>
          <MydataRow labelText={"Confirmar email"}>
            <EditInput
              type={"email"}
              setValue={() => {}}
            />
          </MydataRow>

          <MydataRow labelText={"Contraseña"}>
            <EditInput type={"password"} setValue={() => {}} />
          </MydataRow>

          <MyDataSaveButton isLoading={isLoadingEmail} />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
