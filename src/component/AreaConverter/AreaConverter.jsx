import React, { useState, useEffect } from 'react';
import MetaData from "../../MetaData";
import ReverseCalc from './ReverseConverter'
import './areaconverter.css';

function AreaConverter() {
  const [ropani, setRopani] = useState('');
  const [aana, setAana] = useState('');
  const [paisa, setPaisa] = useState('');
  const [daam, setDaam] = useState('');
  const [bigha, setBigha] = useState('');
  const [katha, setKatha] = useState('');
  const [dhur, setDhur] = useState('');
  const [sqFeet, setSqFeet] = useState('');
  const [sqMeter, setSqMeter] = useState('');

  useEffect(() => {
    calculateArea();
  }, [ropani, aana, paisa, daam, bigha, katha, dhur]);

  const handleRopaniChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'ropani':
        setRopani(value);
        break;
      case 'aana':
        setAana(value);
        break;
      case 'paisa':
        setPaisa(value);
        break;
      case 'daam':
        setDaam(value);
        break;
      default:
        break;
    }
  };

  const handleBighaChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'bigha':
        setBigha(value);
        break;
      case 'katha':
        setKatha(value);
        break;
      case 'dhur':
        setDhur(value);
        break;
      default:
        break;
    }
  };

  const calculateArea = () => {
    let area = 0;
    let area1 = 0;
    if (ropani) {
      area += parseFloat(ropani) * 5476.0000;
      area1 += parseFloat(ropani) * 508.73704704;
    }
    if (aana) {
      area += parseFloat(aana) * 342.2500;
      area1 += parseFloat(aana) * 31.79606544;
    }
    if (paisa) {
      area += parseFloat(paisa) * 85.5625;
      area1 += parseFloat(paisa) * 7.94901636;
    }
    if (daam) {
      area += parseFloat(daam) * 21.390625;
      area1 += parseFloat(daam) * 1.98725409;
    }

    let area2 = 0;
    let area3 = 0;
    if (bigha) {
      area2 += parseFloat(bigha) * 72900;
      area3 += parseFloat(bigha) * 6772.41;
    }
    if (katha) {
      area2 += parseFloat(katha) * 3645;
      area3 += parseFloat(katha) * 338.62;
    }
    if (dhur) {
      area2 += parseFloat(dhur) * 182.25;
      area3 += parseFloat(dhur) * 16.93;
    }

    setSqFeet((area + area2).toFixed(3));
    setSqMeter((area1 + area3).toFixed(3));
  };

  const clearAll = () => {
    setRopani('');
    setAana('');
    setPaisa('');
    setDaam('');
    setBigha('');
    setKatha('');
    setDhur('');
    setSqFeet('');
    setSqMeter('');
  };

  return (
    <>
      <MetaData title="Area Converter" />
      <div className="area-converter-model">
      <h1>Area Converter</h1>
      <div className="input-section">
        <div className="input-group">
          <h2>Ropani System</h2>
          <input type="text" className="form-control" name="ropani" placeholder="Ropani" value={ropani} onChange={handleRopaniChange} />
          <input type="text" className="form-control" name="aana" placeholder="Aana" value={aana} onChange={handleRopaniChange} />
          <input type="text" className="form-control" name="paisa" placeholder="Paisa" value={paisa} onChange={handleRopaniChange} />
          <input type="text" className="form-control" name="daam" placeholder="Daam" value={daam} onChange={handleRopaniChange} />
        </div>
        <div className="input-group">
          <h2>Bigha System</h2>
          <input type="text" className="form-control" name="bigha" placeholder="Bigha" value={bigha} onChange={handleBighaChange} />
          <input type="text" className="form-control" name="katha" placeholder="Katha" value={katha} onChange={handleBighaChange} />
          <input type="text" className="form-control" name="dhur" placeholder="Dhur" value={dhur} onChange={handleBighaChange} />
        </div>
      </div>
      <div className="result-section">
        <div className="result-group">
          <h2>Square Feet</h2>
          <input type="text" className="form-control" name="landinfo_sqfeet" placeholder="Sq.Feet" value={sqFeet} readOnly />
        </div>
        <div className="result-group">
          <h2>Square Meter</h2>
          <input type="text" className="form-control" name="landinfo_sqmeter" placeholder="Sq.Meter" value={sqMeter} readOnly />
        </div>
      </div>
      <div className="button-group">
      
        <button className="clear-button" onClick={clearAll}>Clear All</button>
      </div>
    </div>
    <ReverseCalc/>
    </>
    
  );
}

export default AreaConverter;
