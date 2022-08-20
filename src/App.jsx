import { useState } from "react";
import "./App.css";
import "./uplatnica.scss";
import styled from "styled-components";

import Textarea from "./components/Textarea.jsx";
import Input from "./components/Input.jsx";

import { QRCodeSVG } from "qrcode.react";

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

  const qrModel = `K:PR|V:01|C:1|R:${accountReceivable}|N:${receiver}|I:RSD${totalAmount}|P:${payer}|SF:${payCode}|S:${paymentDescription}|RO:${modelCode}${paymentNumber}`;

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
      </LeftSide>
      <RightSide>
        <Input
          width={15}
          label="Sifra Pacanja"
          value={payCode}
          whenChanged={onPayCodeChange}
        />
        <Input
          width={15}
          label="Valuta"
          value={currencyCode}
          whenChanged={onCurrencyCode}
        />
        <Input
          width={70}
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
          width={25}
          label="Model"
          value={modelCode}
          whenChanged={onSetModelCodeChange}
        />
        <Input
          width={75}
          label="Poziv na broj"
          value={paymentNumber}
          whenChanged={onPaymentNumberChange}
        />

        <QRCodeSVG value={qrModel} />
      </RightSide>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 771px;
  position: relative;
  border: solid 1px #fff;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 3mm;
  line-height: 1.2em;
  margin-left: auto;
  margin-right: auto;
  padding: 6mm;
  &::before {
    border-right: solid 1px #fff;
    content: "";
    display: block;
    height: 70%;
    left: 47.7%;
    position: absolute;
    top: 10%;
  }
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
  width: 50%;
`;

const RightSide = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 50%;
`;

export default App;
