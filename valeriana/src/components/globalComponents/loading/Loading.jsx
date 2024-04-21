import React from "react";
import './loading.css';

export const Loading = ({ isLoading, color, children }) => {

  return (
    <>
      {isLoading ? (
        <div className="grid content-center h-full basis-full">
          <div className="loading flex w-full justify-between m-auto max-w-20">
            <div className={`dot w-2 h-2 rounded-full ${color}`}></div>
            <div className={`dot w-2 h-2 rounded-full ${color}`}></div>
            <div className={`dot w-2 h-2 rounded-full ${color}`}></div>
            <div className={`dot w-2 h-2 rounded-full ${color}`}></div>
            <div className={`dot w-2 h-2 rounded-full ${color}`}></div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};
