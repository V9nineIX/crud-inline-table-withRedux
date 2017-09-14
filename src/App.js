import React, { Component } from 'react';
import './App.css';
import { Grid , Row , Col  } from 'react-bootstrap';
import Table from './components/table';
import Form  from './components/form';
import { connect } from 'react-redux'


class App extends Component {
  render() {
    return (
 
      <Grid>
        <Row className="show-grid table-container"  >
          <Col xs={12} md={12}>
              <Table></Table>
          </Col>
        </Row>
        <Row>
           <Form></Form>
        </Row>
  
      </Grid>

      );
  }
}

const mapStateToProps = state => {
  return {
    profileData: state
  }
}

 export default  connect(mapStateToProps)(App);

//export default App;
