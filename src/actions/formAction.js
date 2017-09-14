export const addData = function (formData) {
    return {
        type: "ADD_DATA",
        name: formData.name,
        age: formData.age,
        nickName: formData.nickName
      //  rowIndex: rowIndex
    }
}


export const setEditAble = function (id) {
    return {
        type: "EDIT_DATA",
        id: id,
        isEditAble: true
    }
}

export const cancelEdit = function (id) {
    return {
        type: "CANCEL_EDIT",
        id:id,
        isEditAble: false
    }
}


export const updateData = function (formData, id) {
    return {
        type: "UPDATE_DATA",
        name: formData.name,
        age: formData.age,
        nickName: formData.nickName,
        id: id
    }
}


export const deleteData = function (id) {
    return {
        type: "DELETE_DATA",
        id: id
    }
}




