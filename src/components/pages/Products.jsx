import { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import Loader from "../atoms/Loader";
import ProductCard from "../molecules/ProductCard";

const Products = () => {
  const { data, error, loading } = useFetch("public/products");
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (data) setResult(data);
  }, [data]);

  const handleFilter = (e) => {
    const filterValue = e.target.value.toLowerCase();

    setResult(
      data.filter((product) =>
        JSON.stringify(product).toLowerCase().includes(filterValue)
      )
    );
  };

  if (loading) return <Loader />;
  if (error) return <div>{error?.message}</div>;

  return (
    <section className="py-16 max-w-200 m-auto">
      <h1 className="text-3xl mb-6 text-center">Explora nuestros productos</h1>
      <input
        onChange={handleFilter}
        type="text"
        placeholder="Filtro de productos"
        className="mb-4"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {result.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default Products;
