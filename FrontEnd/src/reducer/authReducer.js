
const authReducer = (state, action) => {
    switch (action.type) {
        case "HANDLE_USER":
            try {
                const { user, token } = action.payload
                return {
                    ...state,
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password,
                    readHistory: [],
                    token: token
                }
            } catch (error) {
                console.log(error)
            }
        case "HANDLE_READ":
            console.log('clicked');
            const { readHistory } = action.payload
            return {
                ...state,
                readHistory: [...state.readHistory, readHistory],
            }

        default:
            return state
    }
}

export default authReducer