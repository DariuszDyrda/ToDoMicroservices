export function rootReducer(state = {todos: []}, action) {
    switch (action.type) {
        case "LOAD_TODOS": {
          let newState = Object.assign({}, state);
          newState.todos = action.todos.map(val => val);
          return newState;
        }
        case "TOGGLE_CHECK": {
          let newState = Object.assign({}, state);
          newState.todos = newState.todos.map(val => {
            if(val._id === action.todo._id) {
              val.completed = action.todo.completed;
            }
            return val;
          });
          
          return newState;
        }
        case "ADD_NEW_TODO": {
          let newState = Object.assign({}, state, {
            todos: state.todos.concat(action.todo)
          });
          return newState;
        }
        case "DELETE_TODO": {
          let todos = state.todos.filter(val => val._id !== action.todo._id);
          let newState = Object.assign({}, state, { todos });
          return newState;
        }
        default:
          return state
      }
}