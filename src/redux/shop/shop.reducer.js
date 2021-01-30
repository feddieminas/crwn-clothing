//import SHOP_DATA from './shop.data'; //we could even delete the shop.data.js but we keep it there for reference

import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    collections: null
    //collections: SHOP_DATA
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default:
            return state;
    }
}

export default shopReducer;