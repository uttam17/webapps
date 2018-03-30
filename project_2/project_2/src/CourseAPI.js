import React, { Component } from 'react';
import './CourseAPI.css';
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';

export default class CourseForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCourses: [],
            searchDisplayed: true,
            courseInformation: {}
        };

        this.findClasses = this.findClasses.bind(this);
        this.updateYear = this.updateYear.bind(this);
        this.updateSemester = this.updateSemester.bind(this);
        this.selectCCCReq = this.selectCCCReq.bind(this);
        this.submit = this.submit.bind(this);
        this.newSearch = this.newSearch.bind(this);
    }

    findClasses() {
        var url = 'https://www.eg.bucknell.edu/~amm042/service/q?limit=99999';
        const results = this.state.courseInformation;
        for (const key in results) {
            if (results[key]) {
                var q = results[key];
                url += q;
            }
        }

        fetch(url)
            .then(res => {
                res.json()
                    .then(data => {
                        this.setState({
                            selectedCourses: data.message
                        });
                    })
                    .catch()
            })
            .catch(error => console.log("ERROR" + error))
    }
inputVal
    updateYear(inputVal) {
        if (inputVal.target.value === 'select') {
            this.setState({
                courseInformation: {
                    year: null,
                    semester: this.state.courseInformation.semester,
                    CCCReq: this.state.courseInformation.CCCReq,
                }
            });
        } else {
            this.setState({
                courseInformation: {
                    year: `&Year=${inputVal.target.value}`,
                    semester: this.state.courseInformation.semester,
                    CCCReq: this.state.courseInformation.CCCReq,
                }
            });
        }
    }

    updateSemester(inputVal) {
        if (inputVal.target.value === 'select') {
            this.setState({
                courseInformation: {
                    year: this.state.courseInformation.year,
                    semester: null,
                    CCCReq: this.state.courseInformation.CCCReq,
                }
            });
        } else {
            this.setState({
                courseInformation: {
                    year: this.state.courseInformation.year,
                    semester: `&Semester=${inputVal.target.value}`,
                    CCCReq: this.state.courseInformation.CCCReq,
                }
            });
        }
    }

    selectCCCReq(inputVal) {
        if (inputVal.target.value === 'select') {
            this.setState({
                courseInformation: {
                    year: this.state.courseInformation.year,
                    semester: this.state.courseInformation.year,
                    CCCReq: null,
                }
            });
        } else {
            this.setState({
                courseInformation: {
                    year: this.state.courseInformation.year,
                    semester: this.state.courseInformation.year,
                    CCCReq: `&CCCReq=${inputVal.target.value}`,
                }
            });
        }
    }

    submit(inputVal) {
        inputVal.preventDefault();
        this.setState({
            searchDisplayed: true,
        });
        this.findClasses();
    }

    newSearch() {
        this.setState({
            courseInformation: {},
            selectedCourses: [],
            searchDisplayed: true,
        })
    }

    render() {
        return (
            <div className="CourseForm">
          <div className="form">
            <Form onSubmit={this.submit}>
              <div className="dropdown">
              <div class="container">
              <div class="row">
                <div class="col">
                  <div class="row">
                  <div class="col">
                    <FormGroup controlId="formSelectYear">
                      <ControlLabel>Year</ControlLabel>
                      <FormControl componentClass="select" placeholder="select" onChange={this.updateYear}>
                        <option value="select"></option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                      </FormControl>
                      <small id="emailHelp" class="form-text text-muted">Pick the year of the course offering</small>

                    </FormGroup>
                  </div>
                  <div class="col">
                    <FormGroup controlId="formSelectSemester" onChange={this.updateSemester}>
                      <ControlLabel>Semester</ControlLabel>
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select"></option>
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                      </FormControl>
                      <small id="emailHelp" class="form-text text-muted">Pick Fall or Spring</small>

                    </FormGroup>
                  </div>
                  </div>
                  <div class="row">
                    <FormGroup controlId="formSelectCCCReq" onChange={this.selectCCCReq}>
                      <ControlLabel>CCC Requirement</ControlLabel>
                      <FormControl componentClass="select" placeholder="select">
                        <option value="select"></option>
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
                      <small id="emailHelp" class="form-text text-muted">This is the course requirement you need to fill</small>

                    </FormGroup>
                  </div>
                  <div class="row justify-content-md-center">
                    <Button class="btn btn-outline-primary" type="submit button">Search</Button>
                  </div>
                </div>
                <div class="col">
                <h1 class="col2">Classes</h1>
                {
                  this.state.selectedCourses.length !== 0 ?
                  <APIResults
                    courses={this.state.selectedCourses}
                    newSearch={this.newSearch}
                  /> : null
                }
                </div>
                </div>
              </div>
              </div>
            </Form>
          </div>          
      </div>
        );
    }
}

export function APIResults(props) {
    return (
        <div className="APIResults">
      {
        props.courses.length !== 0 ?
        <div class="container">
          <div className="results col">
            <div className="classes">
              {props.courses.map(function(course, i) {
                var courseKey = 'course_'+i;
                var hasRoom = false;
                if(course.Room.length > false) {
                  hasRoom = true;
                }
                var hasLab = false;
                if(course.CrseNum.toUpperCase().includes('L')) {
                  hasLab = true;
                }
                var isRec = false;
                if(course.CrseNum.toUpperCase().includes('R')) {
                  isRec = true;
                }

                if(!hasLab && !isRec) {
                  return(
                    <div key={courseKey} className='course'>
                      <h4>{course.Course}: {course.Title}</h4>
                      <h4>Meeting Time (If empty not assigned): {course["Time:"]}</h4>
                      { hasRoom ? <h4>Room: {course.Room}</h4> : null
                      }
                      {
                        course.Labs.map(function(lab, j) {
                          var labKey = 'extra'+j;
                          return(
                            <div key={labKey} className='extra'>
                              <h4>{lab.Course}: {lab.Title}</h4>
                              <h4>Meeting Time (If empty not assigned): {lab["Meeting Time"]}</h4>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }
                else {
                  return(null);
                }
              })}
            </div>
            </div>
          </div> : null
      }
    </div>
    );
}