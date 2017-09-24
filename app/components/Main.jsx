import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import store from '../store';
import {fetchCampuses} from '../reducers';


export default class Main extends Component {

  componentDidMount () {
    // const studentsThunk = fetchStudents();
    const campusesThunk = fetchCampuses();
    // store.dispatch(studentsThunk);
    store.dispatch(campusesThunk);
  }

  render () {
    return (
      <div className="container">
        <main>
          <Switch>
            <Route path="/campuses" component={AllCampuses} />
            <Route path="/students" component={AllStudents} />
            <Redirect to="/campuses" />
          </Switch>
        </main>
      </div>
    );
  }
}
