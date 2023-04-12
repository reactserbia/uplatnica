import React from 'react'
import S from 'styled-components';

const SaveTemplateModal = ({templateData, closeModal}) => {

     
    const generateTemplate = () => {
        console.log({ templateData })
     const {name, payer} = templateData;
            return  (
                <div>
                    <div><span>Ime sablona: </span><span>{name}</span></div>
                    <div><span>Uplatilac: </span><span>{payer}</span></div>
                </div>
            )
    };

  return (
    <Overlay>
       <Content>
        <div>
            <button onClick={closeModal}>Close</button>
        {generateTemplate()}
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
 background-color: white;
`

export default SaveTemplateModal