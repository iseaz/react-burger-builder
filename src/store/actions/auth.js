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

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, expirationTime * 1000)
	}
}

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart())

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
				console.log(resp)
				dispatch(authSuccess(resp.data.idToken, resp.data.localId))
				dispatch(checkAuthTimeout(resp.data.expiresIn))
			})
			.catch(error => {
				dispatch(authFail(error.response.data.error))
			})
	}
}
