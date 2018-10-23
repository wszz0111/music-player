import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { Row, Col, Icon, } from 'antd'
import { display, get_song_index, get_song_list } from '../store/action'

class Song_form extends React.Component {

    constructor(p) {
        super(p)
        this.state = {
            now_form: {},
            song_list: []
        }
    }

    componentWillMount() {
        axios.post(this.props.ip + "/sf_info", { _id: this.props.song_form }).then((msg) => {
            this.setState({
                now_form: msg.data,
                song_list: msg.data.song_list
            })
        })
    }

    shouldComponentUpdate() {
        this.props.dispatch(display())
        return true
    }

    render() {
        return (
            <div>
                <div className='bla_bg'>
                    <Row className='gd_title'>
                        <Col span={4} className='white'><Icon type="left" onClick={this.goback.bind(this)} style={{ fontSize: 22 }} /></Col>
                        <Col span={16} className='white fs22'>歌单</Col>
                        <Col span={4}><Icon type="bar-chart" style={{ fontSize: 22 }} className='white' /></Col>
                    </Row>
                    <Row className='gd_title img_part'>
                        <Col span={14} className='white'><img src={this.props.ip + this.state.now_form.form_img} className='dg_img' /></Col>
                        <Col span={10} className='white jian'>{this.state.now_form.info}</Col>
                    </Row>
                    <Row className='gd_title'>
                        <Col span={6} className='white'>
                            <Icon type="folder-add" style={{ fontSize: 22 }} />
                            <div>{this.state.now_form.like}</div>
                        </Col>
                        <Col span={6} className='white'>
                            <Icon type="message" style={{ fontSize: 22 }} />
                            <div>{this.state.now_form.comment}</div>
                        </Col>
                        <Col span={6} className='white'>
                            <Icon type="share-alt" style={{ fontSize: 22 }} />
                            <div>{this.state.now_form.share}</div>
                        </Col>
                        <Col span={6} className='white'>
                            <Icon type="download" style={{ fontSize: 22 }} />
                            <div>{this.state.now_form.tag}</div>
                        </Col>
                    </Row>
                </div>

                <div>
                    {
                        this.state.song_list.map((item, index) => {
                            return <Row className='eve_song' onClick={this.enter_sing.bind(this, index)}>
                                <Col span={4} className='fs30'>{index + 1}</Col>
                                <Col span={13}>
                                    <div className='fs22'>{item.song_name}</div>
                                    <div style={{ color: 'lightgrey' }}>{item.singer}</div>
                                </Col>
                                <Col span={7} className='fs22' style={{ paddingTop: 1 + 'rem' }}>
                                    <Icon type="youtube" style={{ fontSize: 25, marginRight: 20 }} />
                                    <Icon type="ellipsis" style={{ fontSize: 25, marginRight: 20 }} />
                                </Col>
                            </Row>
                        })
                    }
                </div>

            </div>)
    }
    enter_sing(index) {
        this.props.dispatch(get_song_index(index))
        this.props.dispatch(get_song_list(this.state.song_list))
        this.props.history.push('/song_list')
    }
    goback() {
        this.props.history.goBack()
    }
}
function filter(data) {
    return {
        song_form: data.now_form,
        ip: data.ip
    }
}

export default connect(filter)(Song_form)