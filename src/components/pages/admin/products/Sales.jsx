import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL } from "../../../../constants/env";
import { getToken } from "../../../../helpers/auth";
import Loader from "../../../atoms/Loader";

const Sales = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${API_URL}/admin/invoices`, {
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
    <div className="max-w-256 m-auto">
      <section className="pt-10">
        <h1 className="text-4xl mb-6">Ventas</h1>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>ID de la compra</th>
              <th>Email del usuario</th>
            </tr>
          </thead>
          <tbody>
            {data ? (
              data?.data?.data.map((p) => (
                <tr key={p.invoice.id}>
                  <td>{new Date(p.invoice.created_at).toString()}</td>
                  <td>{p.invoice.id}</td>
                  <td>{p.user.email}</td>
                </tr>
              ))
            ) : (
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

export default Sales;
