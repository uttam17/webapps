import './CourseAPI.css';
import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, Glyphicon } from 'react-bootstrap';

export default class CourseAPI extends Component {

    constructor(props) {
        super(props);
        this.state = {
			  selectedCourses: [],
			  searchDisplayed: true,
			  loading: false,
			  searchQueries: {
			    professor
      		}
    };
   
	this.getSearchCourses = this.getSearchCourses.bind(this);
	this.refreshYear = this.refreshYear.bind(this);
    this.refreshSemester = this.refreshSemester.bind(this);
    this.refreshCCC = this.refreshCCC.bind(this);
 };

 refreshYear(input){
 	if(input.target.value === 'select') {
      this.setState({
        searchQueries: {
          year,
          semester: this.state.searchQueries.semester,
          CCC: this.state.searchQueries.CCC,
        }
      });
    }
    else {
      this.setState({
        searchQueries: {
          year: `&Year=${input.target.value}`,
          semester: this.state.searchQueries.semester,
          CCC: this.state.searchQueries.CCC,
        }
      });
    }
 };

 refreshSemester(input){
 	if(input.target.value === 'select') {
      this.setState({
        searchQueries: {
          year: this.state.searchQueries.year,
          semester,
          CCC: this.state.searchQueries.CCC,
        }
      });
    }
    else {
      this.setState({
        searchQueries: {
          year: this.state.searchQueries.year,
          semester: `&semester=${input.target.value}`,
          CCC: this.state.searchQueries.CCC,
        }
      });
    }
 };
 refreshCCC(input){
 	if(input.target.value === 'select') {
      this.setState({
        searchQueries: {
          year: this.state.searchQueries.year,
          semester: this.state.searchQueries.semester,
          CCC,
        }
      });
    }
    else {
      this.setState({
        searchQueries: {
          year: this.state.searchQueries.year,
          semester: this.state.searchQueries.semester,
          CCC: `&CCC=${input.target.value}`,
        }
      });
    }
 };

 go() {
	this.setState({
	  searchQueries: {},
	  selectedCourses: [],
	  searchDisplayed: true,
	  loading: false
	})
 }

handleSearchButton() {
    this.setState({
      searchQueries: {},
      selectedCourses: [],
      searchDisplayed: true,
      loading: false
    })
  }
    getSearchCourses() {
    let url = 'https://www.eg.bucknell.edu/~amm042/service/q?limit=99999';
    const queries = this.state.searchQueries;
    for(const key in queries) {
      console.log(queries[key]);
      if(queries[key]) {
        let q = queries[key];
        url += q;
      }
    }
    console.log(url);

    fetch(url)
    .then( res => {
      res.json()
      .then( data => {
        this.setState({
          selectedCourses: data.message
        });
        console.log(this.state.selectedCourses);
      })
      .catch()
    })
    .catch (error => console.log("ERROR"+error))
  };

  render() {
    return (
      <div className="CourseForm">
        {this.state.searchDisplayed:
        
          <div className="form">
            <Form onSubmit={this.handleSubmit}>
              <div className="dropdown">
                <FormGroup controlId="formYear">
                  <ControlLabel>Year</ControlLabel>
                  <FormControl componentClass="select" placeholder="select" onChange={this.refreshSemester}>
                    <option value="select"></option>
                    <option value="2018">2018</option>
                    <option value="2019">2019</option>
                  </FormControl>
                </FormGroup>

                <FormGroup controlId="formSemester" onChange={this.refreshSemester}>
                  <ControlLabel>Semester</ControlLabel>
                  <FormControl componentClass="select" placeholder="select">
                    <option value="select"></option>
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                  </FormControl>
                </FormGroup>

                <FormGroup controlId="formCCC" onChange={this.CCC}>
                  <ControlLabel>CCC Requirement</ControlLabel>
                  <FormControl componentClass="select" placeholder="select">
                    <option value="select"></option>
                    <option VALUE="ARHC">Arts and Humanities</option>
					<option VALUE="AHLG">Arts and Humanities Learning Goals</option>
					<option VALUE="CBL">Community Based Learning</option>
					<option VALUE="DUSC">Diversity in the U.S.</option>
					<option VALUE="GLSP">Engineering Global and Societal Perspectives</option>
					<option VALUE="EGHU">Engineering Humanities</option>
					<option VALUE="EGSS">Engineering Social Science</option>
					<option VALUE="EVCN">Environmental Connections</option>
					<option VALUE="FRST">First year course</option>
					<option VALUE="CCFL">Foreign Language</option>
					<option VALUE="FOUN">Foundation Seminar</option>
					<option VALUE="GBCC">Global Connections</option>
					<option VALUE="CCIP">Integrated Perspectives</option>
					<option VALUE="LBSC">Lab Science</option>
					<option VALUE="NSMC">Natural Science and Mathematics</option>
					<option VALUE="NMLG">Natural Science and Mathematics Learning Goals</option>
					<option VALUE="CCQR">Quantitative Reasoning</option>
					<option VALUE="SL">Service Learning Course</option>
					<option VALUE="SLSC">Social Science</option>
					<option VALUE="SSLG">Social Science Learning Goals</option>
					<option VALUE="W1">Writing Level 1</option>
					<option VALUE="W2">Writing Level 2</option>
                  </FormControl>
                </FormGroup>
              </div>

              
              <Button type="submit">Find Courses</Button>
            </Form>
          </div>
        
        };

        {
            ((this.state.loading) && (this.state.selectedCourses.length === 0))
            ?
            <div className="loading">
              <div className="returnButton">
                <Button bsStyle="primary" onClick={() => {this.handleSearchButton()}}><Glyphicon glyph="search" /></Button>
              </div>
             
            </div>
            
        }

        {
          this.state.selectedCourses.length !== 0
          ?
          <CourseAPI
            courses={this.state.selectedCourses}
            handleSearchButton={this.handleSearchButton}
          />
          
        }
      </div>
    );
  }
}


