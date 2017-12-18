import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (orderId, orderData) => {
	return {
		type: actionTypes.PURCHASE_BURGER_SUCCESS,
		orderId,
		orderData
	}
}

export const purchaseBurgerFail = error => {
	return {
		type: actionTypes.PURCHASE_BURGER_FAIL,
		error
	}
}

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	}
}

export const purchaseBurger = orderData => {
	return dispatch => {
		dispatch(purchaseBurgerStart())
		
		axios.post('/orders.json', orderData)
			.then(resp => {
				dispatch(purchaseBurgerSuccess(resp.data.name, orderData))
			})
			.catch(err => {
				dispatch(purchaseBurgerFail(err))
			})
	}
}

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	}
}
