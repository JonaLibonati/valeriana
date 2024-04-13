import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { SelfUser } from "../../api/selfUser";

export const ValidateUser = () => {
  let user = useParams();

  let firstRender = true;
  useEffect(() => {
    if (!firstRender) {
      console.log(firstRender);
      SelfUser.validateEmail(user)
        .then(({ res, body }) => {
          console.log(body);
        })
        .catch(console.error);
    }

    return () => (firstRender = false);
  }, []);
  return <div>Loading</div>;
};
