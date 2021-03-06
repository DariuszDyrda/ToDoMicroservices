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

export function register(user) {
    return {
        type: "REGISTER",
        user
    }
}

export function login(user) {
    return {
        type: "LOGIN",
        user
    }
}

export function logout() {
    return {
        type: "LOGOUT"
    }
}

export function appLoad(token, socket, redirectTo) {
    return {
        type: "APP_LOAD",
        token,
        socket,
        redirectTo
    }
}

export function onRedirect() {
    return {
        type: "REDIRECT"
    }
}

export function setSettings(settings) {
    return {
        type: "SETTINGS_CHANGE",
        settings
    }
}

export function setSocket(socket) {
    return {
        type: "SET_SOCKET",
        socket
    }
}

export function redirectUnauthorizedAccess(redirectTo) {
    return {
        type: "REDIRECT_UNAUTHORIZED_ACCESS",
        redirectTo
    }
}