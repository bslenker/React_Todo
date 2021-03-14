import React, {Component} from 'react';

class ToDoCreator extends Component {
    constructor(props){
        super(props);
        //we created this constructor above so we can pass in the App's props.
        //remember props are simply the App's data. we did this so we have access to the "state" object.
        //once we have the state object, we add a new property below called "newToDoItem" and set
        //its intitial value to an empty string.
        this.state = {newToDoItem: ""}
    }
    //The updateNewToDoItem function is connected to an onChange event in the input below.
    //This function takes in the change in the input and sets a new value to the newToDoItem state variable.
                        //passing through the param event
    updateNewToDoItem = (event) =>{
        this.setState(
            {newToDoItem: event.target.value}//value is the input we are targeting
        );
    }

    createNewToDo =()=>{
        //The createNEwToDo function is for the onClick of Add new todo button. It does two things
        //1. it invokes a callback method of the ToDoCreator Component and passes the callback
        //the value of the new todo item (this.state.meToDoItem)
        //2. it resets the newToDoItem back to an empty string so it is blank and ready for the next todo item.
        this.props.callback(this.state.newToDoItem);
        this.setState({newToDoItem:""});
    }
    render = () =>
        <div className="my-1">
            <input className="form-control" value={this.state.newToDoItem} onChange={this.updateNewToDoItem}/>

            <button className="btn btn-primary mt-1" onClick={this.createNewToDo}>
                Add New ToDo
            </button>
        </div>
}

export default ToDoCreator;