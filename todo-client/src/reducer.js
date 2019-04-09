import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

let defaultState = {
  todos: [], 
  token: null, 
  redirectTo: null,
  appLoaded: false,
  settings: {
    dontShowCompletedTasks: null
  }
}

function reducer(state = defaultState, action) {
    switch (action.type) {
        case "LOAD_TODOS": {
          let todos = action.todos.map(val => val);
          let newState = Object.assign({}, state, { todos });
          return newState;
        }
        case "TOGGLE_CHECK": {
          let todos = state.todos.map(val => {
            if(val._id === action.todo._id) {
              val.completed = action.todo.completed;
            }
            return val;
          });
          let newState = Object.assign({}, state, { todos });
          
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
        case "REGISTER": {
          let token = action.user.token;
          let redirectTo = '/todos'
          let newState = Object.assign({}, state, { token, redirectTo });
          return newState;
        }
        case "LOGIN": {
          let token = action.user.token;
          let redirectTo = '/todos'
          let newState = Object.assign({}, state, { token, redirectTo });
          return newState;
        }
        case "LOGOUT": {
          let redirectTo = '/';
          let token = null;
          let newState = Object.assign({}, state, { token, redirectTo });
          return newState;
        }
        case "APP_LOAD": {
          let token = action.token;
          let redirectTo = action.redirectTo;
          let appLoaded = true;
          let newState = Object.assign({}, state, {token, redirectTo, appLoaded});
          return newState;
        }
        case "REDIRECT": {
          let redirectTo = null;
          let newState = Object.assign({}, state, { redirectTo });
          return newState;
        }
        case "REDIRECT_UNAUTHORIZED_ACCESS": {
          let redirectTo = action.redirectTo;
          let newState = Object.assign({}, state, { redirectTo });
          return newState;
        }
        case "SETTINGS_CHANGE": {
          let settings = action.settings;
          let newState = Object.assign({}, state, { settings });
          return newState;
        }
        default:
          return state
      }
}

const rootReducer = (history) => combineReducers({
  reducer: reducer,
  router: connectRouter(history)
})

export default rootReducer;