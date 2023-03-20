/* eslint-disable no-unused-vars */
const GlobalFunction = {
    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('name')
        localStorage.removeItem('token')
    }
}

export default GlobalFunction;