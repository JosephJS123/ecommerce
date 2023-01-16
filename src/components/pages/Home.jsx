import { API_URL } from "../../constants/env";
import MainHeader from "../organisms/MainHeader";

function Home() {
  return (
    <>
      <div>
        <h1>Hola {API_URL}</h1>
        <p>Este es el sitio en desarrollo</p>
      </div>
    </>
  );
}

export default Home;
