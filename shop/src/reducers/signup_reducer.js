import { SIGNUP_ATTEMPTING, SIGNUP_FAILED, SIGNUP_SUCCESS } from '../actions/types'

const INITIAL_STATE = {
    attempting: false,
    isCreated: false,
    profile: {},
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SIGNUP_ATTEMPTING:
            return { ...state, attempting: true, isCreated: false, error: null }
        case SIGNUP_SUCCESS:
            return { ...state, attempting: false, isCreated: true, error: null }
        case SIGNUP_FAILED:
            return { ...state, attempting: false, isCreated: false, error: action.payload }
        default:
            return state;
    }
}