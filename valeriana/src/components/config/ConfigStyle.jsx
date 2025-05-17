import { ThemeButton } from "../globalComponents/themeSelector/ThemeButton";
import { ConfigElement } from "./ConfigElement";
import { ConfigHeading } from "./ConfigHeading";


export const ConfigStyle = () => {
  return (
    <>
      <ConfigHeading text={'Temas'}/>
      <ConfigElement name={'Color de tema'}>
      <div className="relative flex gap-3">
        <ThemeButton themeName={"lightRose"} />
        <ThemeButton themeName={"greenEmerald"} />
        <ThemeButton themeName={"lightSky"} />
        <ThemeButton themeName={"dark"} />
      </div>
    </ConfigElement>
    </>
  );
};
