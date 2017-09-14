
import React from 'react';
import {
  Table as TableCom,
  Button,
  ButtonToolbar,
  FormControl
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { setEditAble , 
         updateData ,
         deleteData ,
         cancelEdit
        } from '../actions/formAction'; 

class Table extends React.Component {

   profileArray = [];
  
  constructor(props) {
    super(props);
    this.setProfile = this.setProfile.bind(this);
    this.onClickCancelEdit = this.onClickCancelEdit.bind(this);
  }


  //  when edit  profile  copy profile to temp before  update or cancel.
  setProfile( event , profile , rowIndex){

    if(this.profileArray.length < 1) {
      this.profileArray =  this.props.profileData;
    }
    this.profileArray[rowIndex][event.target.name] = event.target.value;
 

  }

  // when cancel event  rollback  profile data.
  onClickCancelEdit(idx ,  rowIndex){
    if(this.profileArray.length < 1) {
      this.profileArray =  this.props.profileData;
    }
     this.profileArray[idx] =   this.props.profileData[idx];
     this.props.handleCancel(rowIndex);

  }

   
  renderOptionList(selectedValue){
    let optionList = [];
    for(let i=1 ; i <=99 ; i++){
      if( i ==  selectedValue )
       optionList.push(<option  selected={selectedValue} key={i}  value={i}>{i}</option>);
      else
        optionList.push(<option key={i}  value={i}>{i}</option>);
    }
  return optionList;
   
}

  renderTBody(profile , idx) {

    // if(profile == null) 
    //     return null;

    return (
      <tr key={idx} >
       { profile.isEditAble ? 
        <td>
          <FormControl
            type="text"
            name="name"
            defaultValue={profile.name}
            onChange={ (event) => this.setProfile( event, profile , idx)}
          
          />
        </td>
        : <td>
          { profile.name }
          </td> }

         { profile.isEditAble ? 
        <td>
          <FormControl componentClass="select"
            defaultValue={profile.age}
            name="age"
            onChange={ (event) => this.setProfile( event, profile , idx)}
            >

            <option value="select">select</option>
            {this.renderOptionList(profile.age)}

          </FormControl>
        </td>
          : <td>
            {profile.age}
            </td>
          }

          { profile.isEditAble ? 
        <td>
          <FormControl
            type="text"
            defaultValue={profile.nickName}
            onChange={ (event) => this.setProfile( event, profile , idx)}
            name="nickName"
     
          />
        </td>
          :<td>
            {profile.nickName}
          </td>
          }
  
        <td>
          <ButtonToolbar>
          { !profile.isEditAble ? 
            <Button onClick={ () => this.props.handleEditAble(profile.rowIndex)}  bsStyle="primary">Edit</Button>
            :
            <Button onClick={ () => this.props.handleUpdate(this.profileArray[idx] , profile.rowIndex)}  bsStyle="info">Update</Button>

          }
          { !profile.isEditAble ? 
            <Button onClick={ () => this.props.handleDelete(profile.rowIndex)}    bsStyle="danger">Delete</Button>
            :
            <Button onClick={ () => this.onClickCancelEdit(idx , profile.rowIndex)}    bsStyle="warning">Cancel</Button>
          }
          </ButtonToolbar>

        </td>
    
      </tr>
    )

  }

  render() {

    return (
      <TableCom responsive  bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Nickname</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.props.profileData.map( (profile ,rowIndex) =>   this.renderTBody(profile , rowIndex))}
        </tbody>
      </TableCom>
    )
  }
} //  end class


const mapStateToProps = state => {
  return {
    profileData: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    handleEditAble : rowIndex => dispatch(setEditAble(rowIndex)) ,
    handleUpdate : (profile , rowIndex) => dispatch(updateData( profile, rowIndex)),
    handleCancel : rowIndex  => dispatch(cancelEdit(rowIndex)),  
    handleDelete : rowIndex => dispatch(deleteData(rowIndex)) 

  }
}

export default connect(mapStateToProps ,mapDispatchToProps )(Table)

