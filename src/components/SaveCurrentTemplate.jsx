import React, { useState } from 'react'
import S from 'styled-components';
import Input from './Input';

const SaveCurrentTemplate = ({storeTemplate,currentTemplate}) => {
    const [templateIsSaved, setTemplateIsSaved] = useState(false);
    const [templateName, setTemplateName] = useState('');

    const saveTemplate = () => {
        const templates = JSON.parse(localStorage.getItem('templates')) ?? [];

        storeTemplate(templateName);
        setTemplateIsSaved(true);
    }

    const generateSaveCurrentTemplate = () => {
        const { payer,
        paymentDescription,
        receiver,
        payCode,
        currencyCode,
        totalAmount,
        bankNumber,
        accountNumber,
        controlNumber,
        modelCode,
        paymentNumber} = currentTemplate;
               return  (
                   <div>
                       <div>
                    
                        <Input
                            type='text'
                            width={100}
                            label='Naziv šablona obavezan'
                            id='templateName'
                            help='unesite naziv šablona'
                            helpText='Ovde upišite kako će šablon da se zove.'
                            value={templateName}
                            whenChanged={(event) => setTemplateName(event.target.value)} />
                       </div>
                       <p>Uplatilac: {payer}</p>
                       <p>Svrha: {paymentDescription}</p>
                       <p>Primalac: {receiver}</p>
                       <p>Šifra plaćanja: {payCode.label}</p>
                       <p>Valuta: {currencyCode}</p>
                       <p>Ukupno: {totalAmount}</p>
                       <p>Broj računa: {bankNumber}-{accountNumber}-{controlNumber}</p>
                       <p>Model: {modelCode.value}</p>
                       <p>Poziv na broj: {paymentNumber}</p>
                       <SaveTemplateBtn disabled={templateName === ''} onClick={saveTemplate}>Sačuvaj šablon</SaveTemplateBtn>
                       {templateIsSaved && <p>Šablon je sačuvan</p>}
                   </div>
               )
       };

  return (
    <>
        <h4>Sačuvaj ovaj šablon</h4>
        {generateSaveCurrentTemplate()}
    </>
  )
}

const SaveTemplateBtn = S.button
`align-self: center;
padding: 0.5rem;
`

export default SaveCurrentTemplate;
