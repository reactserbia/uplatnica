import { useState } from "react";
import "./App.css";
import "./uplatnica.scss";
import styled from "styled-components";

import Textarea from "./components/Textarea.jsx";
import Input from "./components/Input.jsx";

function App() {
  const [payer, setPayer] = useState("");
  const onPayerChange = (event) => setPayer(event.target.value);

  const [paymentDescription, setPaymentDescription] = useState("");
  const onPaymentDescriptionChange = (event) =>
    setPaymentDescription(event.target.value);

  const [receiver, setReceiver] = useState("");
  const onReceiverChange = (event) => setReceiver(event.target.value);

  const [payCode, setPayCode] = useState("");
  const onPayCodeChange = (event) => setPayCode(event.target.value);

  const [currencyCode, setCurrencyCode] = useState("");
  const onCurrencyCode = (event) => setCurrencyCode(event.target.value);

  const [totalAmount, setTotalAmount] = useState("");
  const onTotalAmountChange = (event) => setTotalAmount(event.target.value);

  const [accountReceivable, setAccountReceivable] = useState("");
  const onAccountReceivableChange = (event) =>
    setAccountReceivable(event.target.value);

  const [modelCode, setModelCode] = useState("");
  const onSetModelCodeChange = (event) => setModelCode(event.target.value);

  const [paymentNumber, setPaymentChange] = useState("");
  const onPaymentNumberChange = (event) => setPaymentChange(event.target.value);

  return (
    <Container>
      <BankSlipTitle>Nalog Za Uplatu</BankSlipTitle>
      <LeftSide>
        <Textarea label="Platilac" value={payer} whenChanged={onPayerChange} />
        <Textarea
          label="Svrha uplate"
          value={paymentDescription}
          whenChanged={onPaymentDescriptionChange}
        />
        <Textarea
          label="Primalac"
          value={receiver}
          whenChanged={onReceiverChange}
        />
        <button
          onClick={() =>
            console.log(
              payer,
              paymentDescription,
              receiver,
              payCode,
              currencyCode,
              totalAmount,
              accountReceivable,
              modelCode,
              paymentNumber
            )
          }
        >
          C
        </button>
      </LeftSide>
      <RightSide>
        <Input
          label="Sifra Pacanja"
          value={payCode}
          whenChanged={onPayCodeChange}
        />
        <Input
          label="Valuta"
          value={currencyCode}
          whenChanged={onCurrencyCode}
        />
        <Input
          label="Iznos"
          value={totalAmount}
          whenChanged={onTotalAmountChange}
        />
        <Input
          label="Racun Primaoca"
          value={accountReceivable}
          whenChanged={onAccountReceivableChange}
        />
        <Input
          label="Model"
          value={modelCode}
          whenChanged={onSetModelCodeChange}
        />
        <Input
          label="Poziv na broj"
          value={paymentNumber}
          whenChanged={onPaymentNumberChange}
        />
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  height: 100mm;
  width: 209mm;
  position: relative;
  border: solid 1px #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3mm;
  line-height: 1.2em;
  margin-left: auto;
  margin-right: auto;
  padding: 6mm;
`;

const BankSlipTitle = styled.div`
  color: #fff;
  font-size: 4.95mm;
  font-weight: 600;
  text-transform: uppercase;
  text-align: right;
`;

const LeftSide = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 30%;
`;

const RightSide = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 30%;
  background-color: red;
`;

export default App;
