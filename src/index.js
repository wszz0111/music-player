import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css';
import './index.css'
import App from './yun/app'


import { Provider } from 'react-redux'
import store from './store/store'

//任务栏
// ReactDOM.render((<Task/>),app)

ReactDOM.render((<Provider store={store}><App/></Provider>),app)