import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import Navbar from './Navbar';
import store from '../store';
import {fetchCampuses, fetchStudents} from '../reducers';


export default class Main extends Component {

  componentDidMount () {
    const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    store.dispatch(studentsThunk);
    store.dispatch(campusesThunk);
  }

  render () {
    return (
      <div className="container">
      <Navbar />
      <main>
          <Switch>
            <Route exact path="/campuses" component={AllCampuses} />
            <Route path="/students" component={AllStudents} />
            <Route path="/campuses/:campusId" component={SingleCampus} />
            <Redirect to="/campuses" />
          </Switch>
        </main>
      </div>
    );
  }
}
