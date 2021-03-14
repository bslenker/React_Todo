import React, { Component } from 'react';
//The above import statement is like a using statement in C#. 
//It imports the React library and specifically the component code functionality into the this App.js file.
import 'bootstrap/dist/css/bootstrap.css';
//the above import brings the bootstrap functionality into this App component.
import ToDoBanner from './components/ToDoBanner';
//The above import is nessacessary to include the todoBanner component in its partent component (App).
import ToDoCreator from './components/ToDoCreator';
import ToDoRow from './components/ToDoRow';
import VisibilityControl from './components/VisibilityControl';


export default class app extends Component {
  //above we have created a class called App that extends the functionality of the Component Class from the React Library. 
  //Export is a keyword that make the class avaiable for use outside of the JS file where it is created.

  //Stateful Component - React components have a special property called state. the state is used to define the state of data (or props)
  constructor() {//constructor is a method
    super();
    //The above syntax allows the component to keep track of changes made in the virtual DOM. with the sytax,
    // we are able to keep track of realtime changes to any data.
    this.state = {
      userName: "Ben Slenker",
      todoItems: [
        { action: "Call Plumber", done: false },
        { action: "Buy Bread", done: false },
        { action: "File Taxes", done: false },
        { action: "Wash the car", done: false },
        { action: "Buy groceries", done: false }
      ],
      showCompleted: true
    }
  }

  //The createNewToDoCallback function below is the callback for the ToDoCreator component. The "newToDo" param that is passed through the function
  //comes from where the callback is initiated, from the ToDoCreator component (createNEwToDo function)
  createNewToDoCallback = (newToDo) => {
    //Below we use the spread operator to include all of the todo items still listed in our data, and add the new todo item
    //to the end of that collection. The spread operator allows us to capture all of the current tido items in the collection without having to rewrite
    //them over and over again.
    if(this.state.todoItems.find(x=>x.action===newToDo)){
      this.setState({
      todoItems: [
        ...this.state.todoItems, { action: newToDo, done: false }
      ]
    }, () =>localStorage.setItem("storedToDos", JSON.stringify(this.state))
    )}
  }

  toDoTableRows = (task) => this.state.todoItems.filter(x => x.done === task).map(x => <ToDoRow key={x.action} item={x} callback={this.toggleToDo} />)

  //The setState method is invoked below and React will make a new object with those changes.  
  //Under the hood, React will compare the new object with the DOM object. If there is a difference b/w those 2 objects, then the DOM will get re-drawn
  //(NOT a RELOAD) and then we see the changes.

  toggleToDo = (checkedToDoItem) => this.setState({
    todoItems: this.state.todoItems.map(x => x.action === checkedToDoItem.action ? { ...x, done: !x.done } : x)
  });

  //The below syntax is called an arrow function. This is an ES6 functionality that allows for simpler syntax in calling functions in JS.
  //If I had parameters to pass through this funciton, they would be written inside the parens.
  //Notice that we do not need scopes for this method/function and we do not need the return keyword to start rendering our content.

  //The componentDidMount() below is a built-in React method to handle logic for when the app "mounts" or "loads in".
  //We will look to the localStorage object which is a built-in object that allows for local browser storage much like how cookies work.
  componentDidMount = () => {
    let storedData = localStorage.getItem("storedToDos");
    this.setState(
      storedData != null ? JSON.parse(storedData) : {
        userName: "Billy Bob",
        todoItems: [{ action: "Default ToDo", done: false }],
        showCompleted: true
      }
    );
  }

  render = () =>
    <div>
      <ToDoBanner userName={this.state.userName} todoItems={this.state.todoItems} />

      <ToDoCreator callback={this.createNewToDoCallback} />

      <table className="table table-striped table-bordered">
        <thead>
          <th>Description</th>
          <th>Mark Complete</th>
        </thead>
        <tbody>
          {/*This portion of code will be calling a function that generates a new row in our table for every todo item.*/}
          {this.toDoTableRows(false)}
        </tbody>
      </table>


      {/*This is where our VisibilityControl  component will go.*/}
      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl isChecked={this.state.showCompleted} callback={(checked) => this.setState({ showCompleted: checked })} />
      </div>
      {this.state.showCompleted &&
        <table className="table table-striped table-bordered">
          <thead>
            <th>Description</th>
            <th>Mark Complete</th>
          </thead>
          <tbody>
            {/*This portion of code will be calling a function that generates a new row in our table for every todo item.*/}
            {this.toDoTableRows(true)}
          </tbody>
        </table>
      }

    </div>
}

/* import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
 */