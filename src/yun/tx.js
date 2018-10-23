import React from 'react'
import axios from 'axios'
import { Upload, Icon, message } from 'antd';
import connect from 'react-redux'

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('只能上传JPG格式文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('图片不得超过2MB');
    }
    return isJPG && isLt2M;
}
// let  ip='http://192.168.123.120:3000'
// let  ip='http://172.20.10.6:3000'
let  ip='http://172.20.10.4:3000'

class Avatar extends React.Component {

    state = {
        loading: false,
        imageUrl: '',
    };
    gets(key, type) {
        let data = sessionStorage[key]
        if (data) {
            return JSON.parse(data);
        }
        else {
            return type || "";
        }
    }
    componentWillMount() {
        let data = this.gets('users', []);
        if (data.length != 0) {
            axios.post(ip + "/get_user_info", { _id: data[0]._id }).then((msg) => {
                this.setState({
                    imageUrl: ip + msg.data.img,
                })
            })
        }
    }

    handleChange = (info) => {
        console.log(info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                loading: false,
                imageUrl,
            }))
        }
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">更换头像</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action='//172.20.10.6:3000/upimg'
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} className='tximg' alt="avatar" /> : uploadButton}
            </Upload>
        );
    }
}
export default Avatar