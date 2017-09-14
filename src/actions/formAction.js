export const addData = function (formData, rowIndex) {
    return {
        type: "ADD_DATA",
        name: formData.name,
        age: formData.age,
        nickName: formData.nickName,
        rowIndex: rowIndex
    }
}


export const setEditAble = function (rowIndex) {
    return {
        type: "EDIT_DATA",
        rowIndex: rowIndex,
        isEditAble: true
    }
}

export const cancelEdit = function (rowIndex) {
    return {
        type: "CANCEL_EDIT",
        rowIndex: rowIndex,
        isEditAble: false
    }
}


export const updateData = function (formData, rowIndex) {
    return {
        type: "UPDATE_DATA",
        name: formData.name,
        age: formData.age,
        nickName: formData.nickName,
        rowIndex: rowIndex
    }
}


export const deleteData = function (rowIndex) {
    return {
        type: "DELETE_DATA",
        rowIndex: rowIndex
    }
}


