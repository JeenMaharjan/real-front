import React, { useState } from 'react'
import MetaData from "../../MetaData";
import './emi.css'

function EMICalculator() {
    const [purchasePrice, setPurchasePrice] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [loanTerm, setLoanTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [emi, setEmi] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
  
    const calculateEMI = () => {
      const principal = purchasePrice - downPayment;
      const monthlyInterestRate = interestRate / 12 / 100;
      const numberOfMonths = loanTerm * 12;
  
      const emiAmount = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfMonths)) / (Math.pow(1 + monthlyInterestRate, numberOfMonths) - 1);
      const totalPaymentAmount = emiAmount * numberOfMonths;
      const totalInterestAmount = totalPaymentAmount - principal;
  
      setEmi(emiAmount.toFixed(2));
      setTotalPayment(totalPaymentAmount.toFixed(2));
      setTotalInterest(totalInterestAmount.toFixed(2));
    };
  
    return (
      <>
      <MetaData title="EMI Calculator" />
        <div className="EMI-model">
        <h1>EMI Calculator</h1>
        <div className="calculator" style={{letterSpacing:"1px"}}>
          <label htmlFor="purchasePrice">Purchase Price</label>
          <input type="number" id="purchasePrice" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} placeholder="Enter purchase price" />
  
          <label htmlFor="downPayment">Down Payment</label>
          <input type="number" id="downPayment" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} placeholder="Enter down payment" />
  
          <label htmlFor="loanTerm">Terms (Years)</label>
          <select id="loanTerm" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)}>
            <option value="">Select</option>
            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
            <option value="6">6 Years</option>
            <option value="7">7 Years</option>
            <option value="8">8 Years</option>
            <option value="9">9 Years</option>
            <option value="10">10 Years</option>
          </select>
  
          <label htmlFor="interestRate">Interest Rate</label>
          <input type="number" id="interestRate" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} placeholder="Enter interest rate" />
  
          <button onClick={calculateEMI}>Calculate Payment</button>
  
          {emi && (
            <div id="result">
              <p>Monthly EMI: <span>{emi}</span></p>
              <p>Total Payment: <span>{totalPayment}</span></p>
              <p>Total Interest: <span>{totalInterest}</span></p>
            </div>
          )}
        </div>
      </div>
      </>
      
    );
}

export default EMICalculator