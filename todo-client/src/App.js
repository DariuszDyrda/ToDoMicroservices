import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {todos: []};
  }

  async componentWillMount() {
    var todos = [];
    todos = await fetch("http://localhost:8080/api/todos")
      .then(data => data.json())
      .then(data => data)
      .catch(err => {
        console.log(err)
      })
    console.log(todos);
    this.setState({todos});
  }

  render() {
    var view = this.state.todos.map(todo => {
      return <p key={todo._id}>{todo.task}</p>
    })
    return (
      <div className="App">
        {view}
      </div>
    );
  }
}

export default App;
