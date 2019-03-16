export function loadTodos(todos) {
    return {
        type: "LOAD_TODOS",
        todos
    }
}

export function toggleCheck(todo) {
    return {
        type: "TOGGLE_CHECK",
        todo
    }
}

export function addNewTodo(todo) {
    return {
        type: "ADD_NEW_TODO",
        todo
    }
}

export function deleteTodo(todo) {
    return {
        type: "DELETE_TODO",
        todo
    }
}