import Logo from "../molecules/MainHeader/Logo";
import MainMenu from "../molecules/MainHeader/MainMenu";

const MainHeader = ({ children }) => {
  return (
    <div className="fixed bg-gradient w-full z-10">
      <div className="w-full m-auto flex items-center lg:max-w-200">
        <Logo />
        {children}
      </div>
    </div>
  );
};

export default MainHeader;
