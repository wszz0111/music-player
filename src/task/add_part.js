import React from 'react'

class Add_input extends React.Component{

    render(){
        return(
            <div><input type='text' ref='addthing'/><input type='button' value='添加'onClick={this.click_btn.bind(this)}/></div>
        )
    }
    click_btn(){
        let add_task=this.refs.addthing.value
        this.props.click(add_task)
    }

}
export default Add_input