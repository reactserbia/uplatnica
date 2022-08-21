import { useReducer } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { QRCodeSVG } from 'qrcode.react'

import Textarea from './components/Textarea.jsx'
import Input from './components/Input.jsx'

const initialState = {
    payer: '',
    paymentDescription: '',
    receiver: '',
    payCode: '',
    currencyCode: 'RSD',
    totalAmount: '',
    accountReceivable: '',
    modelCode: '',
    paymentNumber: ''
}

const ACTIONS = {
    PAYER_CHANGED: 'payer-change',
    PAYMENT_DESCRIPTION: 'payment-description-change',
    RECEIVER_CHANGED: 'receiver-change',
    PAYCODE_CHANGED: 'pay-code-change',
    CURRENCY_CHANGED: 'currency-change',
    TOTAL_AMOUNT: 'total-amount-change',
    ACCOUNT_RECEIVABLE: 'account-available-change',
    MODEL_CODE: 'model-code-change',
    PAYMENT_NUMBER: 'payment-number-change',
    RESET_VALUES: 'reset-values'
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
        case ACTIONS.ACCOUNT_RECEIVABLE:
            return {
                ...state,
                accountReceivable: action.payload
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
        case ACTIONS.RESET_VALUES:
            return init()
        default:
            console.error('Action.type must be ' + action.type)
            return state
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState, init)

    const onPayerChange = event => dispatch({ type: ACTIONS.PAYER_CHANGED, payload: event.target.value })
    const onPaymentDescriptionChange = event =>
        dispatch({ type: ACTIONS.PAYMENT_DESCRIPTION, payload: event.target.value })
    const onReceiverChange = event => dispatch({ type: ACTIONS.RECEIVER_CHANGED, payload: event.target.value })
    const onPayCodeChange = event => dispatch({ type: ACTIONS.PAYCODE_CHANGED, payload: event.target.value })
    const onCurrencyCode = event => dispatch({ type: ACTIONS.CURRENCY_CHANGED, payload: event.target.value })
    const onTotalAmountChange = event => dispatch({ type: ACTIONS.TOTAL_AMOUNT, payload: event.target.value })
    const onAccountReceivableChange = event =>
        dispatch({ type: ACTIONS.ACCOUNT_RECEIVABLE, payload: event.target.value })

    const onSetModelCodeChange = event => dispatch({ type: ACTIONS.MODEL_CODE, payload: event.target.value })
    const onPaymentNumberChange = event => dispatch({ type: ACTIONS.PAYMENT_NUMBER, payload: event.target.value })
    const resetValues = () => dispatch({ type: ACTIONS.RESET_VALUES })

    const qrModel = `K:PR|V:01|C:1|R:${state.accountReceivable}|N:${state.receiver}|I:${state.currencyCode}${state.totalAmount}|P:${state.payer}|SF:${state.payCode}|S:${state.paymentDescription}|RO:${state.modelCode}${state.paymentNumber}`

    return (
        <Container>
            <GlobalStyles />
            <BankSlipTitle>Nalog Za Uplatu</BankSlipTitle>
            <LeftSide>
                <Textarea label='Platilac' value={state.payer} whenChanged={onPayerChange} />
                <Textarea
                    label='Svrha uplate'
                    value={state.paymentDescription}
                    whenChanged={onPaymentDescriptionChange}
                />
                <Textarea label='Primalac' value={state.receiver} whenChanged={onReceiverChange} />
            </LeftSide>
            <RightSide>
                <Input width={17} label='Sifra Pacanja' value={state.payCode} whenChanged={onPayCodeChange} />
                <Input
                    width={17}
                    disabled={true}
                    label='Valuta'
                    value={state.currencyCode}
                    whenChanged={onCurrencyCode}
                />
                <Input width={66} label='Iznos' value={state.totalAmount} whenChanged={onTotalAmountChange} />
                <Input label='Racun Primaoca' value={state.accountReceivable} whenChanged={onAccountReceivableChange} />
                <Input width={25} label='Model' value={state.modelCode} whenChanged={onSetModelCodeChange} />
                <Input
                    width={75}
                    label='Poziv na broj'
                    value={state.paymentNumber}
                    whenChanged={onPaymentNumberChange}
                />

                <QRCodeSVG value={qrModel} />
            </RightSide>
            <button onClick={resetValues}>Očisti vrednosti</button>
        </Container>
    )
}

const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
        padding: 0;
        margin: 0;
    }
    body, h1, h2, h3, h4, p, figure, blockquote, dl, dd { margin: 0; }
    ul[role='list'], ol[role='list'] { list-style: none; }
    html:focus-within { scroll-behavior: smooth; }
    body {
        min-height: 100vh;
        text-rendering: optimizeSpeed;
        line-height: 1.5;
        overflow: hidden;
    }
    a:not([class]) { text-decoration-skip-ink: auto; }
    img, picture {
        max-width: 100%;
    }
    input, button, textarea, select { font: inherit; }
    @media (prefers-reduced-motion: reduce) {
        html:focus-within { scroll-behavior: auto; }
        
        *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
        }
    }
`

const Container = styled.div`
    width: 100%;
    max-width: 800px;
    position: relative;
    line-height: 1.2em;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 3mm;
    border: solid 1px #fff;
    padding: 6mm;

    &::before {
        border-right: solid 1px #fff;
        content: '';
        display: block;
        height: 70%;
        left: 47.7%;
        position: absolute;
        top: 10%;
    }
`

const BankSlipTitle = styled.div`
    color: #fff;
    font-size: 4.95mm;
    font-weight: 600;
    text-transform: uppercase;
    text-align: right;
`

const LeftSide = styled.div`
    display: inline-block;
    vertical-align: top;
    width: 50%;
`

const RightSide = styled.div`
    display: inline-block;
    vertical-align: top;
    width: 50%;
`

export default App
