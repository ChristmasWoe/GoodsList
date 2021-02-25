import { UPDATE_ORDER, ADD_GOOD, REMOVE_GOOD } from './Constants'

export const updateOrder = updatedGoods => ({
    type: UPDATE_ORDER,
    payload: updatedGoods,
})

export const addGood = good => ({
    type: ADD_GOOD,
    payload: good,
})

export const removeGood = id => ({
    type: REMOVE_GOOD,
    payload: id
})