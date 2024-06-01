import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Section } from "../components/globalComponents/layout/Section";
import { User } from "../api/user";
import { UserContext } from "../contexts/UserContext";

export const PatientsPage = () => {
  const [results, setResults] = useState([]);

  const { user } = useContext(UserContext);
  console.log(user.role)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { res, body } = await User.search({ value: e.target[1].value });
    console.log(res);
    setResults(body);
  };

  return (
    <>
      {(user.role.current === 'doctors' || user.role.current === 'psychologist') ? (
        <div className="grid gap-3">
          <Section></Section>
        </div>
      ) :
        <Navigate to="/app/user"/>
      }
    </>
  );
};
