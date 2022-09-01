import { IState } from '../models/stateModel'

export function createQrModel(state: IState) {
    return `
        K:PR|
        V:01|
        C:1|
        R:${state.accountReceivable}|
        N:${state.receiver}|
        I:${state.currencyCode}${state.totalAmount},|
        P:${state.payer}|
        SF:${state.payCode.value}|
        S:${state.paymentDescription}|
        RO:${state.modelCode.value}${state.paymentNumber}
    `
}
