import React from "react";
import { useParams } from "react-router-dom";

export const NewPassword = () => {

  const { token } = useParams();

  console.log(token)

  return (
    <>
      {/* <form className="flex flex-wrap mb-8 mt-8" onSubmit={handleSubmit}>
        <Input name={"email_address"} type={"email"} placeholder={"eMail"} />
        <p
          ref={errorElem}
          style={{ color: "white" }}
          className="ml-2 mt-2 text-sm italic transition-all duration-[1000ms]"
        >
          {errorText}
        </p>
        <Submit text={"Ingresa"} />
      </form> */}
    </>
  );
};
