import React, { useState } from "react";
import { Section } from "../components/globalComponents/layout/Section";
import { SearcherBar } from "../components/globalComponents/searcher/SearcherBar";
import { UserResult } from "../components/globalComponents/searcher/UserResult";
import { User } from "../api/user";
import { ContactTemplate } from "../components/globalComponents/contactTemplate/ContactTemplate";
import { XIcon } from "../components/globalComponents/icons/XIcon";
import { useData } from "../contexts/DataContext";
import { usePatient } from "../contexts/PatientContext";

export const MyPsychologistPage = () => {
  const [results, setResults] = useState([]);

  const { contacts } = useData();
  const { PsychologistHelpers } = usePatient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { res, body } = await User.searchPsychologist({
      value: e.target[1].value,
    });
    console.log(res);
    setResults(body);
  };

  return (
    <>
      <div className="grid gap-3">
        {contacts.length === 0 ? (
          <Section className={"relative"}>
            <>
              <SearcherBar
                placeholder={"psicolog@s"}
                handleSubmit={handleSubmit}
              />
              <div className="pt-4 flex flex-wrap gap-4 justify-left">
                {results.length === 0 ? (
                  <div className="w-full text-lg text-center text-secondary-base">
                    No hay resultados
                  </div>
                ) : (
                  results.map((res) => (
                    <UserResult
                      user={res}
                      handleClick={(e) =>
                        PsychologistHelpers.handleContact(e, res)
                      }
                    />
                  ))
                )}
              </div>
            </>
          </Section>
        ) : (
          <></>
        )}
        <Section>
          <div className="pt-4 flex flex-wrap gap-4 justify-left">
            {contacts.length === 0 ? (
              <div className="w-full text-lg text-center text-secondary-base">
                Todavía no has contactado a ningun psicólog@
              </div>
            ) : (
              <>
                <div className="w-full text-2xl">Mi psicolog@</div>
                {contacts.map((psychologist) => (
                  <ContactTemplate
                    user_name={psychologist.user_name}
                    first_name={psychologist.first_name}
                    last_name={psychologist.last_name}
                    email_address={psychologist.email_address}
                  >
                    <div className="flex flex-wrap gap-4 justify-between items-center">
                      {!psychologist.isAccepted ? (
                        <p className="text-yellow-400">Solicitud enviada</p>
                      ) : (
                        <p className="text-green-400">Solicitud aceptada</p>
                      )}
                      <button className="text-secondary-base hover:text-primary-dark" onClick={(e) => PsychologistHelpers.handleDelete(e)}>
                        <XIcon className={'size-8'}/>
                      </button>
                    </div>
                  </ContactTemplate>
                ))}
              </>
            )}
          </div>
        </Section>
      </div>
    </>
  );
};
