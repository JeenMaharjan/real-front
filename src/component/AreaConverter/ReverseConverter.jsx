import React, { useState, useEffect } from 'react';
import MetaData from "../../MetaData";
import './areaconverter.css';

function AreaConverter() {
  const [ropani, setRopani] = useState('');
  const [aana, setAana] = useState('');
  const [paisa, setPaisa] = useState('');
  const [daam, setDaam] = useState('');

  const [sqFeet, setSqFeet] = useState('');
  const [sqMeter, setSqMeter] = useState('');

  useEffect(() => {
    if (!sqFeet && !sqMeter) {
      calculateArea();
    }
  }, [ropani, aana, paisa, daam]);

  useEffect(() => {
    if (sqFeet) {
      reverseCalculateAreaFromSqFeet();
    } else if (sqMeter) {
      reverseCalculateAreaFromSqMeter();
    }
  }, [sqFeet, sqMeter]);

  const handleSqFeetChange = (event) => {
    setSqFeet(event.target.value);
    setSqMeter('');
  };

  const handleSqMeterChange = (event) => {
    setSqMeter(event.target.value);
    setSqFeet('');
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

    setSqFeet((area).toFixed(3));
    setSqMeter((area1 ).toFixed(3));
  };

  const reverseCalculateAreaFromSqFeet = () => {
    let totalSqFeet = parseFloat(sqFeet) || 0;

    if (totalSqFeet) {
      setRopani(Math.floor(totalSqFeet / 5476));
      totalSqFeet %= 5476;
      setAana(Math.floor(totalSqFeet / 342.25));
      totalSqFeet %= 342.25;
      setPaisa(Math.floor(totalSqFeet / 85.5625));
      totalSqFeet %= 85.5625;
      setDaam((totalSqFeet / 21.390625).toFixed(2));
    }
  };

  const reverseCalculateAreaFromSqMeter = () => {
    let totalSqMeter = parseFloat(sqMeter) || 0;
    let totalSqFeet = totalSqMeter * 10.7639; // 1 sq meter = 10.7639 sq feet

    setSqFeet(totalSqFeet.toFixed(3));
    reverseCalculateAreaFromSqFeet();
  };

  const clearAll = () => {
    setRopani('');
    setAana('');
    setPaisa('');
    setDaam('');
    setSqFeet('');
    setSqMeter('');
  };

  return (
    <>
      <MetaData title="Area Converter" />
      <div className="area-converter-model">
        <h1>Reverse Converter</h1>
      
        <div className="input-section">
          <div className="input-group">
            <h2>Square Feet</h2>
            <input type="text" className="form-control" name="landinfo_sqfeet" placeholder="Sq.Feet" value={sqFeet} onChange={handleSqFeetChange} />
          </div>
          <div className="input-group">
            <h2>Square Meter</h2>
            <input type="text" className="form-control" name="landinfo_sqmeter" placeholder="Sq.Meter" value={sqMeter} onChange={handleSqMeterChange} />
          </div>
        </div>
        <div className="result-section">
          <div className="result-group">
            <h2>Converted Values</h2>
            <div>Ropani: {ropani}</div>
            <div>Aana: {aana}</div>
            <div>Paisa: {paisa}</div>
            <div>Daam: {daam}</div>
       
          </div>
        </div>
        <div className="button-group">
          <button className="clear-button" onClick={clearAll}>Clear All</button>
        </div>
      </div>
    </>
  );
}

export default AreaConverter;
