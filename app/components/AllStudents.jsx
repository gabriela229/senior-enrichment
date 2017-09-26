import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import StudentForm from './StudentForm';
import {deleteStudent} from '../reducers';


class AllStudents extends Component {
  constructor(){
    super();
    this.state = {
      showForm: false
    };
    this.toggleForm = this.toggleForm.bind(this);
  }
  toggleForm(){
    this.setState({showForm: !this.state.showForm});
  }

  render(){
  const {students, history, removeStudentOnClick} = this.props;
  const {showForm} = this.state;
  const {toggleForm} = this;
  let counter = 0;
    return (
      <div>
        <h1>Students</h1>
        <div className="row">
          <div className="col-md-6">
        {showForm === true ?
          <StudentForm toggleForm={toggleForm} history={history} />
          :
          <div className="form-group">
            <button onClick={toggleForm} className="btn btn-success">Add Student</button>
          </div>
        }
          </div>
        </div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Campus</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map( student => {
              return (
                <tr key={student.id}>
                  <th scope="row">{++counter}</th>
                  <td ><NavLink to={`/students/${student.id}`} activeClassName="active">{student.name}</NavLink></td>
                  <td>{student.email}</td>
                  <td>{student.campus ? <NavLink to={`/campuses/${student.campusId}`}>{student.campus.name} </NavLink> : 'not assigned'}</td>
                  <td><button value={student.id} onClick={removeStudentOnClick} className="btn btn-danger">Delete</button></td>
                </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeStudentOnClick (event){
      const id = event.target.value * 1;
      const action = deleteStudent(id);
      dispatch(action);
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AllStudents);
