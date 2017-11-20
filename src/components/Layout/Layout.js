import React from 'react'

import Aux from '../../hoc/Auxi'
import classes from './Layout.css'

const layout = props => (
	<Aux>
		<div>TSB</div>
		<main className={classes.Content}>{props.children}</main>
	</Aux>
)

export default layout
