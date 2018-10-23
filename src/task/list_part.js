import React from 'react'
import ReactDOM from 'react-dom';

class Task_list extends React.Component{

    constructor(props){
        super(props)
        console.log('list_part设置初始化state');
    }

    componentWillMount(){
        console.log('list_part_state设置完毕');
    }

    componentDidMount(){
        console.log('list_part_dom绘制完毕');
    }

    render(){
        console.log('render_list_part');
        let {data}=this.props
        return(
            <ul>
                {
                    data.map((item)=>{
                        return <li className={item.info} key={item.id} onClick={this.li_btn.bind(this,item.id)}>{item.task_name}</li>
                    })
                }
            </ul>
        )
    }

    componentWillReceiveProps(nextProps,nextState)
    {
        console.log('list_part收到新的props')
    }

    shouldComponentUpdate(nextProps,nextState){
        console.log('list_part比较值，是否修改');
        return true
    }
    componentWillUpdate()
    {
        console.log('list_part修改state值');
    }
    componentDidUpdate()
    {
        console.log('list_part更新完成，获取新dom，返回should')
    }


    li_btn(index){
        this.props.click(index)
    }
}
export default Task_list