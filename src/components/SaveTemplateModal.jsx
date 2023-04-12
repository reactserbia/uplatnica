import React from 'react'
import S from 'styled-components';

const SaveTemplateModal = ({currentTemplate, templates, closeModal, storeTemplate}) => {

     
    const generateSaveCurrentTemplate = () => {
        console.log({ currentTemplate })
     const {name, payer,
     paymentDescription,
     receiver,
     payCode,
     currencyCode,
     totalAmount,
     bankNumber,
     accountNumber,
     controlNumber,
     accountReceivable,
     modelCode,
     paymentNumber} = currentTemplate;
            return  (
                <div>
                    <p>Ime sablona: {name}</p>
                    <p>Uplatilac: {payer}</p>
                    <p>Svrha: {paymentDescription}</p>
                    <p>Primalac: {receiver}</p>
                    <p>Sifra placanja: {payCode.label}</p>
                    <p>Valuta: {currencyCode}</p>
                    <p>Ukupno: {totalAmount}</p>
                    <p>Broj racuna: {bankNumber}-{accountNumber}-{controlNumber}</p>
                    <p>Model: {modelCode.value}</p>
                    <p>Poziv na broj: {paymentNumber}</p>
                </div>
            )
    };

 const generateAllTemplates = () => {
    return templates.map((item) => {
        <li>{item?.name}</li>
    })
 }

  return (
    <Overlay>
       <Content>
        <div>
            <button onClick={closeModal}>Close</button>
        {generateSaveCurrentTemplate()}
            <button onClick={storeTemplate}>Sacuvaj sablon</button>
            <h4>Sacuvani sabloni</h4>
            <ul>
            {generateAllTemplates()}
            </ul>
        </div>
       </Content>
    </Overlay>
  )
}

const Overlay = S.div`
position:absolute;
top; 0;
left: 0;
right; 0;
bottom: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: rgb(31,194,157, 0.5);
`
const Content = S.div
`width: 50%;
 height:50%;
 display: flex;
 flex-direction: column;
 align-items: flex-start;
 background-color: white;
 padding: 1rem;
 text-align:start;
`

export default SaveTemplateModal