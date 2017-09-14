
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

   profileArray = [];  //  temp data for edit each row before send to redux state.
  
  constructor(props) {
    super(props);
    this.setProfile = this.setProfile.bind(this);
    this.onClickCancelEdit = this.onClickCancelEdit.bind(this);
    this.onClickDelete  = this.onClickDelete.bind(this);
  }

  componentWillReceiveProps(nextProps){
    //  when add  new row keep temp data  length equal with new state.
    for(let i = 0 ; i <= nextProps.profileData.length - 1 ; i++){
          if(this.profileArray[i] == undefined ){
            this.profileArray[i] =  {};
             this.profileArray[i] = nextProps.profileData[i];
          }
    }

  }

  //  when edit  profile  copy profile to temp data before  update or cancel.
  setProfile( event , profile , idx){

    if(this.profileArray.length < 1) {
      this.profileArray =  this.props.profileData;
    }

    if(this.profileArray[idx] == undefined) this.profileArray[idx] = {};

 
    this.profileArray[idx][event.target.name] = event.target.value;
 

  }

  // when cancel event  rollback  profile data.
  onClickCancelEdit(idx ,  id){
    if(this.profileArray.length < 1) {
      this.profileArray =  this.props.profileData;
    }

    if(this.profileArray[idx] == undefined) this.profileArray[idx] = {};

     this.profileArray[idx] =   this.props.profileData[idx];
     this.props.handleCancel(id);

  }



  onClickDelete(idx ,id){
    this.profileArray.splice(idx, 1); 
    this.props.handleDelete(id);
  }
   
  renderOptionList(selectedValue){
    let optionList = [];
    for(let i=1 ; i <=99 ; i++){
      if( i ==  selectedValue )
       optionList.push(<option defaultValue={selectedValue} key={i}  value={i}>{i}</option>);
      else
        optionList.push(<option key={i}  value={i}>{i}</option>);
    }
  return optionList;
   
}

  renderTBody(profile , idx) {

    return (
      <tr key={profile.id} >

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
            <Button onClick={ () => this.props.handleEditAble(profile.id)}  bsStyle="primary">Edit</Button>
            :
            <Button onClick={ () => this.props.handleUpdate(this.profileArray[idx] , profile.id)}  bsStyle="info">Update</Button>

          }
          { !profile.isEditAble ? 
            <Button onClick={ () => this.onClickDelete(idx ,profile.id)}    bsStyle="danger">Delete</Button>
            :
            <Button onClick={ () => this.onClickCancelEdit(idx , profile.id)}    bsStyle="warning">Cancel</Button>
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
    handleEditAble : id => dispatch(setEditAble(id)) ,
    handleUpdate : (profile , id) => dispatch(updateData( profile, id)),
    handleCancel : id  => dispatch(cancelEdit(id)),  
    handleDelete : id => dispatch(deleteData(id)) 

  }
}

export default connect(mapStateToProps ,mapDispatchToProps )(Table)

