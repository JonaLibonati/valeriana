import React, { useContext } from "react";
import { PsychologistContext } from "../../contexts/PsychologistContext";
import { PlusIcon } from "../globalComponents/icons/PlusIcon";
import { Link } from "react-router-dom";
import { Section } from "../globalComponents/layout/Section";

export const MyPsychologistCard = () => {
  const { myPsychologist } = useContext(PsychologistContext);

  return (
    <Section className="col-span-4">
      <div className="flex h-full flex-wrap content-between">
        <div className="w-full">Mi psicolog@</div>
        {myPsychologist.length === 0 ? (
          <Link
            to={"/app/user/psychologist"}
            className="group inline text-2xl text-secondary-base hover:text-primary-dark "
          >
            Agrega a tu psicolog@
            <PlusIcon
              className={
                "ml-2 inline size-7 border-2 rounded-full group-hover:border-primary-dark"
              }
            />
          </Link>
        ) : (
          myPsychologist.map((psychologist) => (
            <>
              <div className="text-3xl text-primary-dark">
                {psychologist.user_name}
              </div>
            </>
          ))
        )}
      </div>
    </Section>
  );
};
