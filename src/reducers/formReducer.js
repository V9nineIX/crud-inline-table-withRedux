const rootReducer = (state = [], action) => {

    switch (action.type) {
          // Math.random should be unique because of its seeding algorithm.
            // Convert it to base 36 (numbers + letters), and grab the first 9 characters
            // after the decimal.
        case "ADD_DATA":
            return [
                ...state, {
                    name: action.name,
                    age: action.age,
                    nickName: action.nickName,
                    id: Math.random().toString(36).substr(2, 9),
                    isEditAble: false
                }
            ];

        case "EDIT_DATA":
            return state.map((data) => {
                if (data.id === action.id) {
                    return { ...data, isEditAble: true}
                } else {
                    return data
                }
            })


        case "UPDATE_DATA":
            return state.map((data) => {
                if (data.id === action.id) {
                    return {
                        ...data,
                        name: action.name,
                        age: action.age,
                        nickName: action.nickName,
                        isEditAble: false
                    }
                } else {
                    return data
                }
            })

        case "CANCEL_EDIT":
            return state.map((data) => {
                if (data.id === action.id) {
                    return {
                        ...data,
                        isEditAble: false
                    }
                } else {
                    return data
                }
            })


        case "DELETE_DATA":
            return  state.filter( data => data.id !== action.id ); 

        default:
            return state

    } //  end swicth 


}

export default rootReducer;