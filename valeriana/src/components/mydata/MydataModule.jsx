import React, { useContext } from 'react';
import { PopUpContext } from '../../contexts/PopUpContext';

export const MydataModule = ({ handleSubmit, children }) => {

  const { usePopUp } = useContext(PopUpContext);

  return (
    <form onSubmit={(e) => handleSubmit(e, {setters: {usePopUp}})} style={{transition:'height 1s'}} className="grid grid-cols-[200px_1fr] gap-2">
      {children}
    </form>
  )
}
