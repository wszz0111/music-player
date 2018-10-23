import React from 'react'
import axios from 'axios'
import { Row, Col, Icon } from 'antd';
import { connect } from 'react-redux'


class Radio extends React.Component {
    constructor(p) {
        super(p)
        this.state = {
            video_list: []
        }
    }
    componentWillMount() {
        axios.post(this.props.ip + "/get_video", {}).then((msg) => {
            this.setState({ video_list: msg.data })
        })
    }
    render() {
        return (
            <div>
                {
                    this.state.video_list.map((item) => {
                        return <div><video src={this.props.ip + item.rd_src} controls className='vd'></video><Row style={{ textAlign: 'center', margin: 1 + 'rem' }}>
                            <Col span={11} style={{ fontSize: 1.2 + 'rem', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{item.name}</Col>
                            <Col span={5}><Icon type="heart-o" style={{ fontSize: 22, marginRight: .3 + 'rem' }} />{item.like}</Col>
                            <Col span={5}><Icon type="message" style={{ fontSize: 22, marginRight: .3 + 'rem' }} />{item.comment}</Col>
                            <Col span={3}><Icon type="ellipsis" style={{ fontSize: 22 }} /></Col>
                        </Row></div>
                    })
                }
            </div>
        )
    }



}
function filter(data) {
    return {
        ip: data.ip
    }
}

export default connect(filter)(Radio) 