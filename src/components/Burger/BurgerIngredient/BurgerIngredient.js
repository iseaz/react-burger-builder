import React, { Component } from 'react'

import classes from './BurgerIngredient.css'

class BurgerIngredient extends Component {
	render(){
		let ingredient = null

		switch (this.props.type) {
			case 'bread-bottom':
				ingredient = <div></div>
			break
			
			default:
				ingredient = null
		}

		return ingredient
	}
}

export default BurgerIngredient
