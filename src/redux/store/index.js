/**
 * 引入createstore 
 */

 import { createStore } from 'redux'
 import reducer from '../reducer/index'

export default (prevState) => createStore(reducer, prevState)