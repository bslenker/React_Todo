import React, { Component } from 'react'

export default class ToDoBanner extends Component {
    render = () =>
        <h4 className="bg-primary text-white text-center p-2">
            {this.props.userName}'s ToDo List ({this.props.todoItems.filter(x=>!x.done).length} items to do)
            {/*The filter method above is creating a new array of items filitered on the done property in the todoItems
            for each item that is not done, we counting that item to be placed in this component. */}
    </h4>
}