import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../constants/env";
import { getToken } from "../../../../helpers/auth";
import useFetch from "../../../../hooks/useFetch";
import Loader from "../../../atoms/Loader";

const Table = () => {
  const { data, error, loading } = useFetch("public/products");

  const deleteProduct = (product) => {
    if (window.confirm("Estás seguro de eliminar?")) {
      axios
        .delete(`${API_URL}/admin/products/${product.id}`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        })
        .then(() => alert("Producto eliminado"));
    }
  };

  if (loading) return <Loader />;
  if (error) return <div>{error?.message}</div>;

  return (
    <div className="max-w-200 m-auto">
      <section className="pt-10">
        <h1 className="text-4xl mb-6">Productos</h1>
        <div className="pt-1 mb-12 pb-1">
          <Link className="bg-gradient button" to="/admin/productos/crear">
            Agregar producto
          </Link>
        </div>
        <table className="overflow-x-scroll">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Editar</th>
              <th>Borrar</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={4}>No existen productos actualmente</td>
              </tr>
            )}
            {data.map((product) => (
              <tr key={product.id}>
                <td>{product.product_name}</td>
                <td>{product.price}</td>
                <td>
                  <Link to={`/admin/productos/editar/${product.id}`}>
                    Editar
                  </Link>
                </td>
                <td>
                  <a
                    className="text-red-600 hover:cursor-pointer"
                    onClick={() => deleteProduct(product)}
                  >
                    Eliminar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Table;
