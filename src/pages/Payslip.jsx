import { useEffect } from 'react'
import styled from 'styled-components'

import Input from '@components/Input.jsx'
import SplittedInput from '@components/SplittedInput.jsx'
import { QRCodeSVG } from 'qrcode.react'
import Textarea from '@components/Textarea.jsx'
import { createQrModel } from '@utils/qrModelUtils'
import { deviceBrakepoints } from '@config/device-brakepoints.jsx'
import { useReducer } from 'react'
import { useLocation } from 'react-router-dom'
import Modelselect from '../components/Modelselect.jsx'
import BankCard from '../components/BankCard.jsx'
import Modal from '../components/Modal.jsx'
import SavedTemplates from '../components/SavedTemplates.jsx'
import SaveCurrentTemplate from '../components/SaveCurrentTemplate.jsx'
import { ModelCodeOptions, PayCodeOptions } from '../constants/codeOptions.js'

//TODO: change value param to string or vice versa


const initialState = {
    payer: '',
    paymentDescription: '',
    receiver: '',
    payCode: PayCodeOptions[1],
    currencyCode: 'RSD',
    totalAmount: '',
    bankNumber: '123',
    accountNumber: '0000000002341',
    controlNumber: '99',
    accountReceivable: '',
    modelCode: ModelCodeOptions[1],
    paymentNumber: '',
    currentTemplate: {},
    modalIsOpen: false,
    saveCurrentTemplateModalContent: false,
    allTemplatesModalIsContent: false,
}

const ACTIONS = {
    PAYER_CHANGED: 'payer-change',
    PAYMENT_DESCRIPTION: 'payment-description-change',
    RECEIVER_CHANGED: 'receiver-change',
    PAYCODE_CHANGED: 'pay-code-change',
    CURRENCY_CHANGED: 'currency-change',
    TOTAL_AMOUNT: 'total-amount-change',
    BANK_NUMBER_CHANGE: 'bank-number-change',
    ACCOUNT_NUMBER_CHANGE: 'account-number-change',
    CONTROL_NUMBER_CHANGE: 'control-number-change',
    MODEL_CODE: 'model-code-change',
    PAYMENT_NUMBER: 'payment-number-change',
    RESET_VALUES: 'reset-values',
    USE_SELECTED_TEMPLATE: 'use-selected-template',
    CURRENT_TEMPLATE: 'current-template',
    MODAL_IS_OPEN: 'modal-is-open',
    SAVE_CURRENT_TEMPLATE_MODAL_CONTENT: 'save-template-modal-is-open',
    ALL_TEMPLATES_MODAL_CONTENT: 'all-templates-modal-is-open',
}

const init = () => initialState

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.PAYER_CHANGED:
            return {
                ...state,
                payer: action.payload
            }
        case ACTIONS.PAYMENT_DESCRIPTION:
            return {
                ...state,
                paymentDescription: action.payload
            }
        case ACTIONS.RECEIVER_CHANGED:
            return {
                ...state,
                receiver: action.payload
            }
        case ACTIONS.PAYCODE_CHANGED:
            return {
                ...state,
                payCode: action.payload
            }
        case ACTIONS.CURRENCY_CHANGED:
            return {
                ...state,
                currencyCode: action.payload
            }
        case ACTIONS.TOTAL_AMOUNT:
            return {
                ...state,
                totalAmount: action.payload
            }
        case ACTIONS.BANK_NUMBER_CHANGE:
            return {
                ...state,
                bankNumber: action.payload,
                accountReceivable: state.bankNumber + state.accountNumber + state.controlNumber
            }
        case ACTIONS.ACCOUNT_NUMBER_CHANGE:
            return {
                ...state,
                accountNumber: action.payload,
                accountReceivable: state.bankNumber + state.accountNumber + state.controlNumber
            }
        case ACTIONS.CONTROL_NUMBER_CHANGE:
            return {
                ...state,
                controlNumber: action.payload,
                accountReceivable: state.bankNumber + state.accountNumber + state.controlNumber
            }
        case ACTIONS.MODEL_CODE:
            return {
                ...state,
                modelCode: action.payload
            }
        case ACTIONS.PAYMENT_NUMBER:
            return {
                ...state,
                paymentNumber: action.payload
            }
        case ACTIONS.CURRENT_TEMPLATE:
            return {
                ...state,
                currentTemplate: action.payload,
            }
        case ACTIONS.MODAL_IS_OPEN:
            return {
                ...state,
                modalIsOpen: action.payload,
            }
        case ACTIONS.SAVE_CURRENT_TEMPLATE_MODAL_CONTENT:
            return {
                ...state,
                saveCurrentTemplateModalContent: action.payload,
            }
        case ACTIONS.ALL_TEMPLATES_MODAL_CONTENT:
            return {
                ...state,
                allTemplatesModalIsContent: action.payload,
            }
        case ACTIONS.USE_SELECTED_TEMPLATE:
            return {
                ...state,
                ...action.payload,
            }
        case ACTIONS.RESET_VALUES:
            return init()
        default:
            console.error('Action.type must be ' + action.type)
            return state
    }
}

function Payslip() {
    const [state, dispatch] = useReducer(reducer, initialState, init)
    const params = new URLSearchParams(useLocation().search)

    const onPayerChange = event => dispatch({ type: ACTIONS.PAYER_CHANGED, payload: event.target.value })
    const onPaymentDescriptionChange = event => dispatch({ type: ACTIONS.PAYMENT_DESCRIPTION, payload: event.target.value })
    const onReceiverChange = event => dispatch({ type: ACTIONS.RECEIVER_CHANGED, payload: event.target.value })
    const onPayCodeChange = event => dispatch({ type: ACTIONS.PAYCODE_CHANGED, payload: event })
    const onCurrencyCode = event => dispatch({ type: ACTIONS.CURRENCY_CHANGED, payload: event.target.value })
    const onTotalAmountChange = event => dispatch({ type: ACTIONS.TOTAL_AMOUNT, payload: event.target.value })

    const appendZeros = value => {
        let newValue = value
        while (newValue.length < 13) newValue = '0' + newValue
        dispatch({ type: ACTIONS.ACCOUNT_NUMBER_CHANGE, payload: newValue })
    }
    const onFixBankNumberChange = event => {
        if (/^[1-9]{0,1}[0-9]{0,2}$/.test(event.target.value))
            dispatch({ type: ACTIONS.BANK_NUMBER_CHANGE, payload: event.target.value })
    }
    const onAccountNumberChange = event => {
        if (/^[0-9]{0,13}$/.test(event.target.value)) {
            dispatch({ type: ACTIONS.ACCOUNT_NUMBER_CHANGE, payload: event.target.value })
        }
    }
    const onControlNumberChange = event => {
        if (/^[1-9]{0,1}[0-9]{0,1}$/.test(event.target.value))
            dispatch({ type: ACTIONS.CONTROL_NUMBER_CHANGE, payload: event.target.value })
    }

    const onSetModelCodeChange = event => dispatch({ type: ACTIONS.MODEL_CODE, payload: event })
    const onPaymentNumberChange = event => dispatch({ type: ACTIONS.PAYMENT_NUMBER, payload: event.target.value })
    const resetValues = () => dispatch({ type: ACTIONS.RESET_VALUES })
    const printPayslip = () => {
        window.print()
    }

    const storeTemplate = (templateName) => {
        const templates = JSON.parse(localStorage.getItem('templates')) ?? [];
        const newTemplate = { ...state.currentTemplate, name: templateName }
        localStorage.setItem('templates', JSON.stringify([...templates, newTemplate]));
    };


    const openSaveCurrentTemplateModal = () => {
        dispatch({ type: ACTIONS.MODAL_IS_OPEN, payload: true });
        dispatch({
            type: ACTIONS.CURRENT_TEMPLATE, payload: {
                name: '',
                payer: state.payer,
                paymentDescription: state.paymentDescription,
                receiver: state.receiver,
                payCode: state.payCode,
                currencyCode: state.currencyCode,
                totalAmount: state.totalAmount,
                bankNumber: state.bankNumber,
                accountNumber: state.accountNumber,
                controlNumber: state.accountNumber,
                accountReceivable: state.accountReceivable,
                modelCode: state.modelCode,
                paymentNumber: state.paymentNumber,
            }
        })
        dispatch({ type: ACTIONS.SAVE_CURRENT_TEMPLATE_MODAL_CONTENT, payload: true })
    };
    const openAllTemplatesModal = () => {
        dispatch({ type: ACTIONS.MODAL_IS_OPEN, payload: true });
        dispatch({ type: ACTIONS.ALL_TEMPLATES_MODAL_CONTENT, payload: true })
    };

    const closeModal = () => {
        dispatch({ type: ACTIONS.MODAL_IS_OPEN, payload: false });
        dispatch({ type: ACTIONS.SAVE_CURRENT_TEMPLATE_MODAL_CONTENT, payload: false })
        dispatch({ type: ACTIONS.ALL_TEMPLATES_MODAL_CONTENT, payload: false })
    };

    const useTemplate = (template) => {
        dispatch({ type: ACTIONS.USE_SELECTED_TEMPLATE, payload: template })
    };

    let qrModel = createQrModel(state)
    useEffect(() => {
        const accountNumber = params.get('account-number')
        const amount = params.get('amount')
        const modelCode = params.get('modelCode')

        if (modelCode) {
            for (let i = 0; i < options.length; i++) {
                if (ModelCodeOptions[i].value === modelCode) {
                    onSetModelCodeChange(ModelCodeOptions[i])
                    console.log('ARE EQUAL')
                    break
                }
            }
        }

        console.table({
            accountNumber,
            amount,
            modelCode
        })
    }, [])

    const whichModalContentToShow = () => {
        if (state.saveCurrentTemplateModalContent) {
            return (
                <SaveCurrentTemplate
                    currentTemplate={state.currentTemplate}
                    storeTemplate={storeTemplate}
                />
            )
        } else if (state.allTemplatesModalIsContent) {
            return (<SavedTemplates useTemplate={useTemplate} />)
        }
    };

    return (
        <><Container>
            <BankSlipTitle>Nalog Za Uplatu</BankSlipTitle>
            <LeftSide>
                <Textarea label='Platilac'
                    id='payer'
                    help='payerHelp'
                    helpText='U ovo polje upišite podatke osobe koja je Platilac.'
                    value={state.payer} whenChanged={onPayerChange} />
                <Textarea
                    label='Svrha uplate'
                    id='paymentDescription'
                    help='paymentDescriptionHelp'
                    helpText='U ovo polje upišite svrhu uplate.'
                    value={state.paymentDescription}
                    whenChanged={onPaymentDescriptionChange} />
                <Textarea label='Primalac'
                    id='receiverDescription'
                    help='receiverDescriptionHelp'
                    helpText='U ovo polje upišite podatke osobe koja je Primalac.'
                    value={state.receiver} whenChanged={onReceiverChange} />
            </LeftSide>
            <RightSide>
                <Modelselect
                    width={23}
                    label='Sifra Pacanja'
                    placeholder='Izaberi'
                    helpId='payCodeOptionsHelp'
                    helpText='Selektujte šifru uplate.'
                    value={state.payCode}
                    options={PayCodeOptions}
                    whenChanged={onPayCodeChange} />
                <Input
                    width={23}
                    disabled={true}
                    label='Valuta'
                    id='valuta'
                    help='valutaHelp'
                    helpText='Ovo polje je onemogućeno jer valuta mora biti RSD.'
                    value={state.currencyCode}
                    whenChanged={onCurrencyCode} />
                <Input
                    type='number'
                    width={54}
                    label='Iznos'
                    id='totalAmount'
                    help='totalAmountHelp'
                    helpText='Ovde upišite brojevima ukupan iznos koji zelite da uplatite.'
                    value={state.totalAmount}
                    whenChanged={onTotalAmountChange} />
                <SplittedInput
                    legend='Broj Racuna'
                    inputs={[
                        {
                            type: 'text',
                            width: 23,
                            value: state.bankNumber,
                            pattern: '^[1-9]{1}[0-9]{2}$',
                            required: true,
                            errorMessage: 'Mora biti trocifren broj',
                            ariaLabel: 'Prve tri cifre',
                            whenChanged: onFixBankNumberChange
                        },
                        {
                            type: 'text',
                            width: 49,
                            value: state.accountNumber,
                            pattern: '^[0-9]{13}$',
                            required: true,
                            errorMessage: 'Mora biti trinaestocifreni broj',
                            ariaLabel: 'Narednih trinaest cifara',
                            whenChanged: onAccountNumberChange,
                            appendZeros: appendZeros
                        },
                        {
                            type: 'text',
                            width: 21,
                            value: state.controlNumber,
                            pattern: '^[1-9]{1}[0-9]{1}$',
                            required: true,
                            errorMessage: 'Mora biti dvocifren broj',
                            ariaLabel: 'Zadnje dve cifre',
                            whenChanged: onControlNumberChange
                        }
                    ]} />
                <BankCard bankNumber={state.bankNumber} />
                <Modelselect
                    width={25}
                    label='Model'
                    placeholder='Izaberi'
                    helpId='modelCodeHelp'
                    helpText='Selektujte model uplate.'
                    large={true}
                    value={state.modelCode}
                    options={ModelCodeOptions}
                    whenChanged={onSetModelCodeChange} />
                <Input
                    type='number'
                    width={75}
                    label='Poziv na broj'
                    id='paymentNumber'
                    help='paymentNumberHelp'
                    helpText='Ovde upišite brojevima poziv na broj za ovu uplatnicu.'
                    value={state.paymentNumber}
                    whenChanged={onPaymentNumberChange} />
                <QRcodeSVGConainer>
                    <QRCodeSVG size={150} value={qrModel} />
                </QRcodeSVGConainer>
            </RightSide>
        </Container>
            {/*TODO: Create button component*/}
            <Button onClick={resetValues} aria-describedby="cleanButtonHelp">Očisti vrednosti</Button>
            <Button type="button" onClick={printPayslip}>Odstampaj uplatnicu</Button>
            <MidleBtn onClick={openSaveCurrentTemplateModal} aria-describedby="saveTemplateButtonHelp">Sačuvaj šablon</MidleBtn>
            <Button onClick={openAllTemplatesModal} aria-describedby="savedTemplatesButtonHelp">Svi šabloni</Button>
            <div hidden id="cleanButtonHelp">
                Ovo dugme vraća sve na početne vrednosti.
            </div>{
                state.modalIsOpen &&
                <Modal
                    closeModal={closeModal}
                >
                    {whichModalContentToShow()}
                </Modal>
            }</>
    )
}

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    position: relative;
    line-height: 1.2em;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3mm;
    border: solid 1px var(--color-primary);
    padding: 6mm;
    margin-bottom: 1em;
    @media ${deviceBrakepoints.desktop} {
        &::before {
            border-right: solid 1px var(--color-primary);
            content: '';
            display: block;
            height: 70%;
            left: 47.7%;
            position: absolute;
            top: 10%;
        }
    }
`

const BankSlipTitle = styled.div`
    color: var(--color-primary);
    font-size: 4.95mm;
    font-weight: 600;
    text-transform: uppercase;
    text-align: right;
`

const LeftSide = styled.div`
    display: inline-block;
    vertical-align: top;
    width: 50%;
    @media ${deviceBrakepoints.mobile} {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
`

const RightSide = styled.div`
    display: inline-block;
    vertical-align: top;
    width: 50%;
    @media ${deviceBrakepoints.mobile} {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
`
const MidleBtn = styled.button`
    margin: 0 0.7rem;
    @media print {
        display: none;
    }
`
const QRcodeSVGConainer = styled.div`
    @media ${deviceBrakepoints.mobile} {
        margin: 5px auto;
    }
`

const Button = styled.button`
    @media print {
        display: none;
    }
`

export default Payslip
