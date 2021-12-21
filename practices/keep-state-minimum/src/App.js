import React, { useCallback, useState } from "react";
import './App.css';
import PriceInput from "./features/PriceInput";

export default function App() {
  const [price,setPrice] = useState()
  const handlePriceChange = useCallback(priceValue=>{
    setPrice(priceValue)
  },[price])
  return (
    <PriceInput price={price} onChange={handlePriceChange}/>
  );
}
