import React from 'react';
import {connect} from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';


function SingleCampus(props){
  const {students, campuses} = props;
  const currentCampus = campuses.filter( campus => {
    return campus.id === props.match.params.campusId * 1;
  })[0];
  const campusStudents = students.filter( student => {
    return student.campusId === props.match.params.campusId * 1;
  });
  let counter = 0;
  return (
    <div>
      <h1>{currentCampus ? currentCampus.name : null}</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Campus</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {campusStudents.map( student => {
          return (
            <tr key={student.id}>
            <th scope="row">{++counter}</th>
                  <td><NavLink to={`/students/${student.id}`} activeClassName="active">{student.name}</NavLink></td>
                  <td>{student.campus.name}</td>
                  <td><button className="btn btn-danger">Delete</button></td>

                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    campuses: state.campuses
  };
};

export default withRouter(connect(mapStateToProps)(SingleCampus));
