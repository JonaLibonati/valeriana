import React, { useState } from "react";
import { ThemeSelector } from "../globalComponents/themeSelector/ThemeSelector";
import { Outlet } from "react-router-dom";
import image from "../../assets/images/valeriana.png";

export const WelcomeDashboard = () => {
  return (
    <div className="relative min-h-screen lg:h-dvh">
      <div className="relative h-full bg-primary-light">
        <svg
          className="absolute z-0 size-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            className="scale-[3] translate-x-[-350px] translate-y-[-550px] min-[490px]:translate-y-[-430px] lg:translate-y-[-350px] fill-tertiary-light"
            d="M 64 49 C 122 6 150 9 235 8 C 410 5 410 180 306 218 C 274 230 236 248 165 249 C 130 250 95 247 49 218 C -10 180 -10 110 64 49"
          />
        </svg>
        <div className="relative z-100 grid grid-rows-3 lg:grid-cols-[minmax(600px,1fr)_minmax(300px,500px)] lg:grid-rows-[auto_minmax(0,1fr)] h-full content-between">
          <div className="relative">
            <div className="m-10">
              <ThemeSelector />
            </div>
            <h1 className="sacramento p-10 text-[68px] min-[490px]:text-[100px] min-[490px]:mt-10 sm:text-[140px] mt-10 sm:mt-0 lg:text-[150px] text-tertiary-dark">
              Valeriana
            </h1>
          </div>
          <div className="relative justify-self-center p-6 lg:p-16 mt-10 mb-6 lg:m-0 min-[490px]:mt-32 min-[490px]:mb-14 h-fit lg:h-full w-full min-w-[240px] max-w-[400px] lg:max-w-none row-span-2 lg:bg-tertiary-light rounded-md">
            <div className="w-full p-4 lg:p-0 bg-tertiary-light lg:rounded-0">
              <Outlet />
            </div>
          </div>
          <div className="relative flex h-full p-10 justify-end content-end">
            <div className="relative lg:absolute bottom-0 h-fit lg:w-[480px] xl:w-[800px] 2xl:w-[1000px]">
              <svg
                className="absolute size-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="scale-[0.6] min-[400px]:scale-[0.8] min-[490px]:scale-110 sm:scale-125 lg:scale-100 xl:scale-150 2xl:scale-[2] fill-tertiary-light"
                  d="M 64 49 C 122 6 150 9 235 8 C 410 5 410 180 306 218 C 274 230 236 248 165 249 C 130 250 95 247 49 218 C -10 180 -10 110 64 49"
                />
              </svg>
              <img className="relative" src={image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
