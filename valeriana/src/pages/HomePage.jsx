import React, { useContext } from "react";
import { TimeContext } from "../contexts/TimeContext";
import { dayAbbr, monthAbbr } from "../helpers/time";
import { Section } from "../components/globalComponents/layout/Section";
import { MyPsychologistCard } from "../components/home/MyPsychologistCard";
import { PatientProvider } from "../contexts/PatientContext";

export const HomePage = () => {
  const { date, day, month, hours, minutes } = useContext(TimeContext);

  return (
    <div className="grid grid-cols-12 gap-3 min-w-[1150px]">
      <Section className="col-span-4">
        <div className="grid grid-cols-[fit-content(0)_minmax(0,1fr)_fit-content(0)] grid-rows-2">
          <p className="row-span-2 self-center max-w-fit text-7xl text-primary-dark">
            {date}
          </p>
          <p className="text-center text-3xl text-primary-dark">
            {dayAbbr[day]}
          </p>
          <p className="row-span-2 justify-self-end self-center text-7xl text-primary-dark">
            {hours}:{minutes}
          </p>
          <p className="text-center text-3xl text-primary-dark">
            {monthAbbr[month]}
          </p>
        </div>
      </Section>
      <PatientProvider><MyPsychologistCard /></PatientProvider>
      <Section className="col-span-4">Estadistica 1</Section>
      <Section className="col-span-4">Notificaciones</Section>
      <Section className="col-span-4">Proximas consultas</Section>
      <Section className="col-span-4">Mis contactos</Section>
    </div>
  );
};
