import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../constants/env";
import { UserContext } from "../../context/UserContext";
import { setToken } from "../../helpers/auth";
import LoginTemplate from "../templates/LoginTemplate";

const Login = () => {
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const [error, setError] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError();

    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };

    axios
      .post(`${API_URL}/public/login`, data)
      .then((res) => {
        setToken(res.data.data.token);
        setUserData(res.data.data.user);
        navigate("/");
      })
      .catch((error) => setError(error));
  };

  return (
    <LoginTemplate title="Iniciar Sesión">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div className="mb-4">
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="text-center pt-1 mb-12 pb-1">
          <button className="bg-gradient w-full" type="submit">
            Ingresar
          </button>
          <Link className="text-gray-500" to="/registro">
            ¿ Deseas registrarte ?
          </Link>
        </div>
        {error && (
          <p className="text-center p-2 bg-red-100 text-red-800">
            {error?.response?.data?.data}
          </p>
        )}
      </form>
    </LoginTemplate>
  );
};

export default Login;