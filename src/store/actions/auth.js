import axios from 'axios'
import * as actionTypes from './actionTypes'

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	}
}

export const authSuccess = (token, userId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken: token,
		userId
	}
}

export const authFail = error => {
	return {
		type: actionTypes.AUTH_FAIL,
		error
	}
}

export const auth = (email, password, isSignup) => {
	return dispatch => {
		const authData = {
			email,
			password,
			returnSecureToken: true
		}

		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAkJ7AQ9lTAEQ04zDylNQLyQr7nSkixCTc'

		if (!isSignup) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAkJ7AQ9lTAEQ04zDylNQLyQr7nSkixCTc'
		}

		axios.post(url, authData)
			.then(resp => {
				dispatch(authSuccess(resp.data.idToken, resp.data.localId))
			})
			.catch(error => {
				dispatch(authFail(error))
			})
	}
}