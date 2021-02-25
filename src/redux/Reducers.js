import { UPDATE_ORDER, ADD_GOOD, REMOVE_GOOD } from './Constants'


const initialState = {
    goods: JSON.parse(localStorage.getItem("goods") || "[]")
}

export const goodsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case UPDATE_ORDER:
            localStorage.setItem("goods", JSON.stringify(action.payload))
            return {
                ...state,
                goods: action.payload
            }
        case ADD_GOOD:
            let goodsWithoutAdded = [...state.goods];
            let goodsWithAdded = goodsWithoutAdded.concat(action.payload)
            localStorage.setItem("goods", JSON.stringify(goodsWithAdded));
            return {
                ...state,
                goods: goodsWithAdded,
            }
        case REMOVE_GOOD:
            let goodsWithoutRemoved = state.goods.filter(good => good.id != action.payload)
            localStorage.setItem("goods", JSON.stringify(goodsWithoutRemoved))
            return {
                ...state,
                goods: goodsWithoutRemoved,
            }
        default:
            return state
    }
}