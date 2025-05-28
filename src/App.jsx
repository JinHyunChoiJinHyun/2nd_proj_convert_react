import { useState } from "react";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Predict from "./components/Predict/Predict";
import Board from "./components/Board/Board";
import DetailPage from "./components/Home/DetailPage";
import CoinItem from "./components/Home/CoinItem";

function App() {
  const [page, setPage] = useState("Home")
  const [coin, setCoin] = useState(null)
  return (
    <div>
      <Header setPage={setPage} page={page}/>      
      
      {page == "Home" && <Home setPage={setPage} setCoin={setCoin} coin={coin}/>}
      {page == "Predict" && <Predict/>}      
      {page == "Board" && <Board/>}      
      {/* {page == "Detail" && <DetailPage coin={coin}/>}       */}
    </div>
  );
}

export default App;
