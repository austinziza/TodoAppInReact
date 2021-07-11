import React, {Component} from 'react';
import PropTypes from 'prop-types'
// import TodoItem from "./TodoItem";

class AddTodo extends Component {
state= {
    title: ''
}
onChange = (e) => this.setState({[e.target.name]: e.target.value});
onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({title: ''});
}
    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <input type="text" name="title" value={this.state.title} onChange={this.onChange} placeholder="Add Todo...." style={{flex: '10', padding: '10px'}}/>
                <input type="submit" value="submit" className="btn" style={{flex: 1}} />
            </form>
        );
    }
}

// PropTypes
AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
}

export default AddTodo;