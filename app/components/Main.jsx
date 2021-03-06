import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {fetchCampuses, fetchStudents} from '../reducers';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import Home from './Home';
import Navbar from './Navbar';
import store from '../store';


export default class Main extends Component {
  constructor(){
    super();
    this.state = {
      data: false
    };
  }

  componentDidMount () {
    const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    Promise.all([
      store.dispatch(studentsThunk),
      store.dispatch(campusesThunk)
    ])
    .then( () => {
      this.setState({data: true});
    });


  }

  render () {
    return (
      <div>
      <Navbar />
      {this.state.data ?
        <main className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/campuses" component={AllCampuses} />
              <Route exact path="/students" component={AllStudents} />
              <Route path="/campuses/:campusId" component={SingleCampus} />
              <Route path="/students/:studentId" component={SingleStudent} />
              <Redirect to="/" />
            </Switch>
            </main>
      : null}
      </div>
    );
  }
}
