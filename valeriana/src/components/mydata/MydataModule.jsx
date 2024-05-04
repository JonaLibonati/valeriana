import React, { useContext, useState } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { PopUpContext } from '../../contexts/PopUpContext';

export const MydataModule = ({ handleSubmit, setIsLoading, children }) => {

  const { user } = useContext(UserContext);

  const { usePopUp } = useContext(PopUpContext);

  return (
    <form onSubmit={(e) => handleSubmit(e, { setters: {usePopUp, setIsLoading}, currentUser: user})} style={{transition:'height 1s'}} className="grid grid-cols-[200px_1fr] p-8 gap-6 rounded-md bg-tertiary-light ">
      {children}
    </form>
  )
}
