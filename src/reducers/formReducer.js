const rootReducer = (state = [], action) => {

    switch (action.type) {
        case "ADD_DATA":
            [
                ...state, {
                    name: action.name,
                    age: action.age,
                    nickName: action.nickName,
                    rowIndex: state.length + 1,
                    isEditAble: false
                }
            ];

            

            return [
                ...state, {
                    name: action.name,
                    age: action.age,
                    nickName: action.nickName,
                    rowIndex: state.length + 1,
                    isEditAble: false
                }
            ];

        case "EDIT_DATA":
            return state.map((data) => {
                if (data.rowIndex == action.rowIndex) {
                    return { ...data, isEditAble: true}
                } else {
                    return data
                }
            })


        case "UPDATE_DATA":
            return state.map((data) => {
                if (data.rowIndex == action.rowIndex) {
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
            debugger;
            return state.map((data) => {
                if (data.rowIndex == action.rowIndex) {
                    return {
                        ...data,
                        isEditAble: false
                    }
                } else {
                    return data
                }
            })


        case "DELETE_DATA":
        
            return  state.filter( data => data.rowIndex !== action.rowIndex ); 

        default:
            return state

    } //  end swicth 


}

export default rootReducer;