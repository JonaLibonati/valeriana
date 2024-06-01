import React, { useContext, useEffect, useState } from "react";
import { EditInput } from "./EditInput";
import { UserContext } from "../../contexts/UserContext";
import { MyDataSaveButton } from "./MyDataSaveButton";
import { MydataRow } from "./MydataRow";

export const EmailModule = () => {
  const { user, email, isLoadingEmail } = useContext(UserContext);

  const [hasChanged, setHasChanged] = useState(false);

  const { email_address } = user.data.current;

  useEffect(() => {
    if (email !== email_address) {
      setHasChanged(true);
    } else setHasChanged(false);
  }, [email, email_address]);

  return (
    <>
      <MydataRow labelText={"Email"}>
        <EditInput type={"email"} value={email} setValue={user.setEmail} />
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
