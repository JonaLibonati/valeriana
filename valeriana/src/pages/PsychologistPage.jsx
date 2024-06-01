import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { Section } from "../components/globalComponents/layout/Section";
import { SearcherBar } from "../components/globalComponents/searcher/SearcherBar";
import { UserResult } from "../components/globalComponents/searcher/UserResult";
import { User } from "../api/user";
import { UserContext } from "../contexts/UserContext";
import { PsychologistContext } from "../contexts/PsychologistContext";

export const PsychologistPage = () => {
  const [results, setResults] = useState([]);

  const { user } = useContext(UserContext);
  const { myPsychologists, PsychologistHelpers } = useContext(PsychologistContext);

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
      {user.role.current === "patient" ? (
        <div className="grid gap-3">
          {myPsychologists.length === 0 ? (
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
                        handleClick={(e) => PsychologistHelpers.handleContact(e, res)}
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
              {myPsychologists.length === 0 ? (
                <div className="w-full text-lg text-center text-secondary-base">
                  Todavía no has contactado a ningun psicólog@
                </div>
              ) : (
                myPsychologists.map((psychologist) => (
                  <>
                    <div className="w-full text-2xl">Mi psicolog@</div>
                    <div className="w-full flex justify-between text-primary-dark">
                      <div className="text-3xl">{psychologist.user_name}</div>
                      <div className="w-max">
                        {!psychologist.isAccepted ? (
                          <div className="inline pl-2 text-tertiary-dark">
                            Solicitud enviada
                          </div>
                        ) : (
                          <></>
                        )}
                        <button className="pl-4" onClick={(e) => PsychologistHelpers.handleDelete(e)}>
                          Eliminar
                        </button>
                      </div>
                    </div>
                    <div className="w-full pl-2 text-sm text-tertiary-dark">
                      {psychologist.first_name} {psychologist.last_name}
                    </div>
                    <div className="w-full pl-2 text-sm text-tertiary-dark">
                      {psychologist.email_address}
                    </div>
                  </>
                ))
              )}
            </div>
          </Section>
        </div>
      ) : (
        <Navigate to="/app/user" />
      )}
    </>
  );
};
