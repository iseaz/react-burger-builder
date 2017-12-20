import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = authData => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		authData
	}
}

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error
	}
}

export const auth = (email, password) => {
	return dispatch => {
		const authData = {
			email,
			password,
			returnSecureToken: true
		}

		axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAkJ7AQ9lTAEQ04zDylNQLyQr7nSkixCTc', authData)
			.then(resp => {
				console.log(resp)
				dispatch(authSuccess(resp.data))
			})
			.catch(error => dispatch(authFail(error)))
	}
}
