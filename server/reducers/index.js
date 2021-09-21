import reduxToolkit from '@reduxjs/toolkit'
const { configureStore } = reduxToolkit
import listReducer from './listSlice/index.js'

const store = configureStore({
    reducer: {list: listReducer}
})

export default store;
