import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';


function AllStudents(props){
  const {students} = props;
  let counter = 0;
  return (
    <div>
      <div>
        <button className="btn btn-success pull-right">Add Student</button>
      </div>
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
          {students.map( student => {
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
  )
}

const mapStateToProps = (state) => {
  return {
    students: state.students
  };
};

export default connect(mapStateToProps)(AllStudents);
