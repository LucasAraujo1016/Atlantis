import { useState } from "react";
import NavbarComponent from "./component/navbar/NavbarComponent";
import HomePage from "./pages/HomePage";
import ClienteList from "./component/cliente/ClientList";
import HospedagemList from "./component/hospedagem/HospedagemList";

function App() {
  const [tela, setTela] = useState("home");

  return (
    <div>
      <NavbarComponent tela={tela} setTela={setTela} />
      <main>
        {tela === "home" && <HomePage />}
        {tela === "clientes" && <ClienteList />}
        {tela === "hospedagens" && <HospedagemList />}
      </main>
    </div>
  );
}

export default App;
