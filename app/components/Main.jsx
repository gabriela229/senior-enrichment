import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import {fetchCampuses, fetchStudents} from '../reducers';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';
import Navbar from './Navbar';
import store from '../store';


export default class Main extends Component {

  componentDidMount () {
    const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    store.dispatch(studentsThunk);
    store.dispatch(campusesThunk);
  }

  render () {
    return (
      <div>
        <Navbar />
        <main className="container-fluid">
            <Switch>
              <Route exact path="/campuses" component={AllCampuses} />
              <Route exact path="/students" component={AllStudents} />
              <Route path="/campuses/:campusId" component={SingleCampus} />
              <Route path="/students/:studentId" component={SingleStudent} />
              <Redirect to="/campuses" />
            </Switch>
        </main>
      </div>
    );
  }
}
