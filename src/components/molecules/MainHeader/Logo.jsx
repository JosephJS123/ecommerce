import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex">
      <Link to="/">
        <img src={logo} alt="Logo eCommerce" width={60}/>
      </Link>
    </div>
  );
};

export default Logo;
