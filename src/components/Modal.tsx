import React, { useEffect } from 'react'
import { deviceBrakepoints } from '../config/device-brakepoints'
import S from 'styled-components';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal:React.FC<ModalProps> = ({closeModal, children}) => {
 
 const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target?.id === 'backdrop') {
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
top: 0;
left: 0;
right: 0;
bottom: 0;
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
background-color: rgba(39,34,100, 0.5);
`
const Content = S.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: rgb(36, 36, 36);
  padding: 1rem;
  text-align:start;
  overflow: auto;

  @media ${deviceBrakepoints.mobile} {
    width: 80%;
    height: 80%;
  }
`
const CloseBtn = S.button
`align-self: flex-end;
`


export default Modal
