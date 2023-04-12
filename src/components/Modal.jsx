import React, { useEffect } from 'react'
import S from 'styled-components';

const Modal = ({closeModal, children}) => {
 
 const handleClickOutside = (event) => {
    const target = event.target;
    if (target.id === 'backdrop') {
        closeModal()
    }
  };


  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return (
    <Backdrop id='backdrop'>
       <Content>
            <CloseBtn onClick={closeModal}>Zatvori</CloseBtn>
               {children}
       </Content>
    </Backdrop>
  )
}

const Backdrop = S.div`
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
 border-radius: 10px;
 text-align:start;
 overflow: auto;
`
const CloseBtn = S.button
`align-self: flex-end;
 padding: 0.5rem;
`


export default Modal