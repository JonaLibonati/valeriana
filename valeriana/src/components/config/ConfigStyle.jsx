import { ThemeButton } from "../globalComponents/themeSelector/ThemeButton";

export const ConfigStyle = () => {
  return (
    <div className="grid grid-cols-[200px_1fr] gap-6 rounded-md bg-tertiary-light">
      <div className="inline text-secondary-base border-r-2 border-secondary-base">
        Color de tema
      </div>
      <div className="relative flex gap-3">
        <ThemeButton themeName={"lightRose"} />
        <ThemeButton themeName={"lightSky"} />
        <ThemeButton themeName={"dark"} />
      </div>
    </div>
  );
};
