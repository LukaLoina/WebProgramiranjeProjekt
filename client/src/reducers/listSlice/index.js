import {createSlice} from '@reduxjs/toolkit'

import LocalStorage from '../../structures/LocalStorage'

import createContainer from './createContainer'
import destroyContainer from './destroyContainer'
import addItem from './addItem'
import removeItem from './removeItem'
import updateItem from './updateItem'
import moveItem from './moveItem'

const containers = LocalStorage.read('containers') ?? []
const containerElements = containers.map(c => {return { [c]: LocalStorage.read(c)}})
const elements = containerElements.length > 0 ? Object.assign(...containerElements, []) : {}

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
