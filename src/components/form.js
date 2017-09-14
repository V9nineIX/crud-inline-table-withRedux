import React from 'react';
import {
    Grid,
    Row,
    Col,
    FormGroup,
    FormControl,
    Button,
    ButtonToolbar
} from 'react-bootstrap';

import { connect  }  from 'react-redux';
import { addData  } from '../actions/formAction';


class Form extends React.Component {
  
    constructor(props) {
        super(props)
         this.state = {
             showForm : false,
             name : "",
             age  : 0 ,
             nickName : ""

         }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChangeInputText = this.handleChangeInputText.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSave = this.handleSave.bind(this);

    }

    resetState(){
        this.setState(
            {
                showForm : false ,
                name : "",
                age  : 0 ,
                nickName : ""
            });
    }

    handleAdd(){

        this.setState({showForm : true})
    }

    handleCancel(){
        this.resetState();
    }

    handleSave(){
        this.props.onSaveData(this.state);
        this.resetState();
    }

    handleChangeInputText(event){

        this.setState({ [event.target.name]: event.target.value });
    }


    renderOptionList(){
        let optionList = [];
        for(let i=1 ; i <=99 ; i++){
           optionList.push(<option  key={i}  value={i}>{i}</option>);
        }
      return optionList;
       
    }

    renderForm() {
        if (this.state.showForm) {
            return (
                <Row className="show-grid">
                    <Col xs={4} md={4}>
                        <FormControl
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChangeInputText}
                        />

                    </Col>
                    <Col xs={2} md={2}>
                        <FormGroup controlId="formControlsSelect">
                            <FormControl componentClass="select"
                            name ="age"
                            value={this.state.age}
                            onChange={this.handleChangeInputText}
                             placeholder="select">
                                <option value="select">select</option>
                              { this.renderOptionList()}
                            </FormControl>
                        </FormGroup>
                    </Col>
                    <Col xs={3} md={3}>
                        <FormControl
                            type="text"
                            name="nickName"
                            value={this.state.nickName}
                            onChange={this.handleChangeInputText}
                        />

                    </Col>
                    <Col xs={3} md={3}>
                        <ButtonToolbar>
                            <Button  onClick={this.handleSave}  bsStyle="success">Save</Button>
                            <Button  onClick={this.handleCancel}   bsStyle="warning">Cancel</Button>
                        </ButtonToolbar>

                    </Col>
                </Row>
            )
        }
        else {
            return null;
        }

    }

    render() {

     return (
        <Grid>
            { this.renderForm() }
            <Row>
                <Col xs={3} md={3}>
                 { !this.state.showForm ? 
                    <Button 
                    onClick={this.handleAdd}
                    bsStyle="info">Add</Button>
                  : null
                 }
                </Col>
            </Row>
        </Grid >
    );
    }
} //  end class



const mapDispatchToProps = dispatch => {
    return {
      onSaveData: formData =>  dispatch(addData(formData))
    }
  }

export default  connect(null ,mapDispatchToProps)(Form);

