import styled from 'styled-components'

import Input from '@components/Input.jsx'
import SplittedInput from '@components/SplittedInput.jsx'
import { QRCodeSVG } from 'qrcode.react'
import Textarea from '@components/Textarea.jsx'
import { createQrModel } from '@utils/qrModelUtils'
import { deviceBrakepoints } from '@config/device-brakepoints.jsx'
import { useReducer } from 'react'
import { useLocation } from 'react-router-dom'

const initialState = {
    payer: '',
    paymentDescription: '',
    receiver: '',
    payCode: '',
    currencyCode: 'RSD',
    totalAmount: '',
    bankNumber: '',
    accountNumber: '',
    controlNumber: '',
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
    BANK_NUMBER_CHANGE: 'bank-number-change',
    ACCOUNT_NUMBER_CHANGE: 'account-number-change',
    CONTROL_NUMBER_CHANGE: 'control-number-change',
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
        case ACTIONS.RESET_VALUES:
            return init()
        default:
            console.error('Action.type must be ' + action.type)
            return state
    }
}

function Payslip() {
    const [state, dispatch] = useReducer(reducer, initialState, init)

    const onPayerChange = event => dispatch({ type: ACTIONS.PAYER_CHANGED, payload: event.target.value })
    const onPaymentDescriptionChange = event =>
        dispatch({ type: ACTIONS.PAYMENT_DESCRIPTION, payload: event.target.value })
    const onReceiverChange = event => dispatch({ type: ACTIONS.RECEIVER_CHANGED, payload: event.target.value })
    const onPayCodeChange = event => dispatch({ type: ACTIONS.PAYCODE_CHANGED, payload: event.target.value })
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
    const onSetModelCodeChange = event => dispatch({ type: ACTIONS.MODEL_CODE, payload: event.target.value })
    const onPaymentNumberChange = event => dispatch({ type: ACTIONS.PAYMENT_NUMBER, payload: event.target.value })
    const resetValues = () => dispatch({ type: ACTIONS.RESET_VALUES })

    let qrModel = createQrModel(state)

    const params = new URLSearchParams(useLocation().search)

    const accountNumber = params.get('account-number')
    const amount = params.get('amount')

    console.table({
        accountNumber,
        amount
    })

    return (
        <Container>
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
                <Input
                    type='number'
                    width={23}
                    label='Sifra Pacanja'
                    value={state.payCode}
                    whenChanged={onPayCodeChange}
                />
                <Input
                    width={23}
                    disabled={true}
                    label='Valuta'
                    value={state.currencyCode}
                    whenChanged={onCurrencyCode}
                />
                <Input
                    type='number'
                    width={54}
                    label='Iznos'
                    value={state.totalAmount}
                    whenChanged={onTotalAmountChange}
                />
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
                    ]}
                />
                <Input
                    type='number'
                    width={25}
                    label='Model'
                    value={state.modelCode}
                    whenChanged={onSetModelCodeChange}
                />
                <Input
                    type='number'
                    width={75}
                    label='Poziv na broj'
                    value={state.paymentNumber}
                    whenChanged={onPaymentNumberChange}
                />
                <QRcodeSVGConainer>
                    <QRCodeSVG size={150} value={qrModel} />
                </QRcodeSVGConainer>
            </RightSide>
            <button onClick={resetValues}>Očisti vrednosti</button>
        </Container>
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
const QRcodeSVGConainer = styled.div`
    @media ${deviceBrakepoints.mobile} {
        margin: 5px auto;
    }
`

export default Payslip
