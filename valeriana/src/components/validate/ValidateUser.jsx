import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SelfUser } from "../../api/selfUser";
import { Loading } from "../globalComponents/loading/Loading";

export const ValidateUser = () => {
  let user = useParams();

  const [isLoading, setIsLoading] = useState(false);

  let firstRender = true;
  useEffect(() => {
    if (!firstRender) {
      console.log(firstRender);
      setIsLoading(true);
      SelfUser.validateEmail(user)
        .then(({ res, body }) => {
          console.log(body);
          setIsLoading(false);
        })
        .catch(console.error);
    }

    return () => (firstRender = false);
  }, []);
  return <Loading isLoading={isLoading} color={'bg-primary-dark'} ></Loading>;
};
