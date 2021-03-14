import React, {Component} from 'react';

class ToDoRow extends Component {
    //There are two kinds of props
    //1. Data props = this.props.userName - allows the parent to pass data to the child
    //2. Function props = this.props.functionName - allows the child to communicate  with the patent. This is the purpose of a callback.
    
    render = () =>
    <tr>
        <td>{this.props.item.action}</td>
        <td>
            <input type="checkbox" checked={this.props.item.done} onChange={() =>this.props.callback(this.props.item)}/>
        </td>
    </tr>
}

export default ToDoRow;