import React from 'react'
import { HashRouter as Router, Route, Link } from 'react-router-dom'

import Yun from './main'
import Mymusic from './mymusic'
import Friend from './friend'
import Acc from './acc'
import Recent from './recent'
import Login from './login'
import Register from './register'


import { Row, Col, Input, Icon } from 'antd';

import WrappedNormalLoginForm from './login'
import RegisterForm from './register'
import Search from './search'
import Song_form from './song_form'
import Song_list from './song_play'
import connect from 'react-redux/lib/connect/connect';


class App extends React.Component {

    render() {
        return (

            < div >
                <Router>
                    <div>
                        <div className='content'>
                            <Route path='/main' component={Yun} />
                            <Route path='/song_form' component={Song_form} />
                            <Route path='/song_list' component={Song_list} />
                            <Route path='/mymusic' component={Mymusic} />
                            <Route path='/friend' component={Friend} />
                            <Route path='/acc' component={Acc} />
                            <Route path='/recent' component={Recent} />
                            <Route path='/login' component={WrappedNormalLoginForm} />
                            <Route path='/register' component={RegisterForm} />
                            <Route path='/searchmus' component={Search} />
                        </div>

                        <Row className={this.props.menu == 'yes' ? 'menu' : 'nomenu'} style={{position:'fixed',left: 0,bottom: 0,right: 0,zIndex: 55}}>
                            <Col span={6}><Link to='/main/music' className='menu2'><Icon type="ant-design" style={{ fontSize: 22 }} />发现音乐</Link ></Col>
                            <Col span={6}><Link to='/mymusic' className='menu2'><Icon type="bars" style={{ fontSize: 22 }} />我的音乐</Link ></Col>
                            <Col span={6}><Link to='/friend' className='menu2'><Icon type="usergroup-add" style={{ fontSize: 22 }} />朋友</Link ></Col>
                            <Col span={6}><Link to='/acc' className='menu2'><Icon type="user" style={{ fontSize: 22 }} />我的账号</Link ></Col>
                        </Row>

                    </div>
                </Router>
            </div >
        )

    }
}
function filter(data){
    return{
        menu:data.menu
    }
}
export default connect(filter)(App)