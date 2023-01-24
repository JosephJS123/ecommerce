import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getToken } from "../../helpers/auth";
import { API_URL } from "../../constants/env";
import Loader from "../atoms/Loader";

const Profile = () => {
  const { userData } = useContext(UserContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${API_URL}/private/invoices`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setData(res);
    };

    getData();
  }, [data]);

  if (data.length === 0) return <Loader />;

  return (
    <div className="max-w-200 m-auto">
      <section className="pt-10 mb-6">
        <h1 className="text-4xl mb-6">
          Perfil de {userData?.details.fullname}
        </h1>
        <p>
          <span className="font-bold">ID de usuario: </span>
          <span>{userData?.id}</span>
        </p>
        <p>
          <span className="font-bold">Nombre completo: </span>
          <span>{userData?.details.fullname}</span>
        </p>
        <p>
          <span className="font-bold">Correo electrónico: </span>
          <span>{userData?.email}</span>
        </p>
        <p>
          <span className="font-bold">Fecha de registro: </span>
          <span>{userData?.created_at}</span>
        </p>
      </section>
      <section>
        <h2 className="text-2xl mb-4">Historial de compras</h2>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>ID de la compra</th>
              <th>Email del usuario</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.data?.data.map((p) => (
                <tr key={p.invoice.id}>
                  <td>{new Date(p.invoice.created_at * 1000).toString()}</td>
                  <td>{p.invoice.id}</td>
                  <td>{p.user.email}</td>
                </tr>
              ))}
            {!data && (
              <tr>
                <td colSpan={3}>No tienes compras actualmente</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Profile;
