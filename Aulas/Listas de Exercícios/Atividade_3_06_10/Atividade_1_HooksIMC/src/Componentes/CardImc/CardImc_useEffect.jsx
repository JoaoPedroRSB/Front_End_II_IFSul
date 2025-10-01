import { useEffect, useState } from 'react';
import './cards.css';

export default function CardImc({ pessoa }) {
  const [peso, setPeso] = useState(pessoa.peso);
  const alt = pessoa.altura;
  
 const imc = (peso / (alt ** 2)).toFixed(2);

  const incrementaPeso = () => setPeso(peso + 1);
  const decrementaPeso = () => setPeso(peso - 1);


  return (
    <div className={`imcCard ${imc <= 24.5 && 'imcGreen'} ||  ${imc > 24.5 && imc < 30  && 'imcYellow'} || ${imc >= 30 && 'imcRed'}`}>
      <h1>{pessoa.name}:</h1>
      <p>Altura: {alt} m</p>
      <p>
      Peso: {peso}
      <span onClick={incrementaPeso}>&nbsp;+&nbsp;</span>
      <span onClick={decrementaPeso}>&nbsp;-&nbsp;</span>
      </p>
      <p>Imc: {imc}</p>
    </div>
  );
}
