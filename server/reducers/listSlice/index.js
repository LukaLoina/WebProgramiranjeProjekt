import reduxToolkit from '@reduxjs/toolkit'
const { createSlice } = reduxToolkit

import loadState from '../../db/loadState.js'

import createContainer from './createContainer.js'
import destroyContainer from './destroyContainer.js'
import addItem from './addItem.js'
import removeItem from './removeItem.js'
import updateItem from './updateItem.js'
import moveItem from './moveItem.js'

const {elements, containers} = await loadState()
console.log(elements)
console.log(containers)

export const listSlice = createSlice({
    name: 'list',
    initialState: {
	elements,
	containers
    },
    reducers: {
	createContainer,
	destroyContainer,
	addItem,
	removeItem,
	updateItem,
	moveItem
    }
})

export default listSlice.reducer
