import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Section } from "../components/globalComponents/layout/Section";
import { User } from "../api/user";
import { UserContext } from "../contexts/UserContext";
import { PatientContext } from "../contexts/PatientContext";
import { ContactTemplate } from "../components/globalComponents/contactTemplate/ContactTemplate";
import { XIcon } from "../components/globalComponents/icons/XIcon";
import { CheckIcon } from "../components/globalComponents/icons/CheckIcon";

export const PatientsPage = () => {
  const [results, setResults] = useState([]);

  const { user } = useContext(UserContext);
  const { myPatients, myRequests, PatientsHelpers } =
    useContext(PatientContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { res, body } = await User.search({ value: e.target[1].value });
    console.log(res);
    setResults(body);
  };

  return (
    <>
      {user.role.current === "psychologist" ? (
        <div className="grid gap-3">
          <Section>
            <div className="w-full text-2xl pb-4">Mis pacientes</div>
            {myPatients.length === 0 ? (
              <div className="w-full text-lg text-center text-secondary-base">
                No hay resultados
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {myPatients.map((patient) => (
                  <ContactTemplate
                    className={"bg-primary-light p-4 rounded-md "}
                    user_name={patient.user_name}
                    first_name={patient.first_name}
                    last_name={patient.last_name}
                    email_address={patient.email_address}
                  >
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                      <div className="flex gap-4 content-center">
                        <button
                          className="text-secondary-base hover:text-primary-dark"
                          onClick={(e) =>
                            PatientsHelpers.handleDelete(e, patient)
                          }
                        >
                          <XIcon className={"size-8"} />
                        </button>
                      </div>
                    </div>
                  </ContactTemplate>
                ))}
              </div>
            )}
          </Section>
          <Section>
            <div className="w-full text-2xl pb-4">Mis Solucitudes</div>
            {myRequests.length === 0 ? (
              <div className="w-full text-lg text-center text-secondary-base">
                No hay resultados
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {myRequests.map((patient) => (
                  <ContactTemplate
                    className={"bg-primary-light p-4 rounded-md "}
                    user_name={patient.user_name}
                    first_name={patient.first_name}
                    last_name={patient.last_name}
                    email_address={patient.email_address}
                  >
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                      <p className="text-yellow-400 pr-4">
                        Solicitud pendiente
                      </p>
                      <div className="flex gap-4 content-center">
                        <button
                          className="text-secondary-base hover:text-primary-dark"
                          onClick={(e) =>
                            PatientsHelpers.handleAccept(e, patient)
                          }
                        >
                          <CheckIcon className={"size-8"} />
                        </button>
                        <button
                          className="text-secondary-base hover:text-primary-dark"
                          onClick={(e) =>
                            PatientsHelpers.handleDelete(e, patient)
                          }
                        >
                          <XIcon className={"size-8"} />
                        </button>
                      </div>
                    </div>
                  </ContactTemplate>
                ))}
              </div>
            )}
          </Section>
        </div>
      ) : (
        <Navigate to="/app/user" />
      )}
    </>
  );
};
