import { useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Predict from "./components/Predict";
import Board from "./components/board";
import DetailPage from "./components/DetailPage";
import CoinItem from "./components/CoinItem";

function App() {
  const [page, setPage] = useState("Home")
  const [coin, setCoin] = useState(null)
  return (
    <div>
      <Header setPage={setPage} page={page}/>      
      
      {page == "Home" && <Home setPage={setPage} setCoin={setCoin}/>}
      {page == "Predict" && <Predict/>}      
      {page == "Board" && <Board/>}      
      {page == "Detail" && <DetailPage coin={coin}/>}      
    </div>
  );
}

export default App;
