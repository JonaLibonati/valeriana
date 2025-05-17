import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../globalComponents/loading/Loading";
import { useUser } from "../../contexts/UserContext";

export const ValidateUser = () => {
  let user = useParams();

  const { handleEmailVerification, wasEmailVerified, isLoading } = useUser();

  useEffect(() => {
    handleEmailVerification(user)

  }, []);
  return <Loading isLoading={isLoading} color={'bg-primary-dark'} ></Loading>;
};
