import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';
import Todos from "./components/Todos";
import Header from "./components/layout/Header";
import AddTodo from "./components/AddTodo";
import About from "./components/pages/About";
// import {v4 as uuid} from "uuid";
import Axios from 'axios'

class App extends Component {
    // Toggle complete
    markComplete = (id) => {
        this.setState({
            todos: this.state.todos.map((todo) => {
                if (todo.id === id) {
                    todo.completed = !todo.completed
                }
                return todo
            })
        })
    }
    delTodo = (id) => {
        Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
            .then(res => this.setState(({todos: [...this.state.todos.filter(todo => todo.id !== id ) ]})))
        /* this.setState({
             todos: [...this.state.todos.splice(id)]
         }) */
    }
    addTodo = (title) => {

        Axios.post('https://jsonplaceholder.typicode.com/todos', {
             title,
                completed: false
            }).then(res => this.setState({todos: [...this.state.todos, res.data]}))
    }
    state = {
        todos: []
    }

    componentDidMount() {
Axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => this.setState({todos: res.data}))
    }

    render() {
        //  console.log(this.state.todos)
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <Header></Header>
                        <Route exact path="/" render={props => (
                            <React.Fragment>
                                <AddTodo addTodo={this.addTodo}></AddTodo>
                                <Todos todos={this.state.todos} markComplete={this.markComplete}
                                       delTodo={this.delTodo}></Todos>
                            </React.Fragment>
                        )}/>

                        <Route path="/about" component={About} />
                    </div>

                </div>
            </Router>
        )
    }
}


export default App;
