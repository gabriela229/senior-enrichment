import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import StudentForm from './StudentForm';
import {deleteStudent, deleteCampus} from '../reducers';


class SingleCampus extends Component {
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
    const {students, campuses, match, history, removeStudentOnClick, removeCampusOnClick, updateCurrentStudent} = this.props;
    const {showForm} = this.state;
    const {toggleForm} = this;
    const currentCampus = campuses.filter( campus => {
      return campus.id === match.params.campusId * 1;
    })[0];
    const campusStudents = students.filter( student => {
      return student.campusId === match.params.campusId * 1;
    });
    let counter = 0;
    return (
      <div>
        <h1>{currentCampus.name}</h1>
        <div className="row">
          <div className="col-md-2">
            <div className="thumbnail">
              <img src={currentCampus.image} />
            </div>
          </div>
          <div className="col-md-2 col-md-offset-8">
            <button value={currentCampus.id} onClick={removeCampusOnClick} className="btn btn-danger">Delete Campus</button>
          </div>
        </div>

        <h3>Students</h3>
        <div className="row">
          <div className="col-md-6">

          {showForm === true ?
            <StudentForm toggleForm={toggleForm} history={history} campusId={currentCampus.id} />
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
                    <td><button value={student.id} onClick={removeStudentOnClick} className="btn btn-danger">Delete</button></td>

                  </tr>
                );
              })
            }
          </tbody>
        </table>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    campuses: state.campuses
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    removeStudentOnClick (event){
      const id = event.target.value * 1;
      const action = deleteStudent(id);
      dispatch(action);
    },
    removeCampusOnClick(event){
      const id = event.target.value * 1;
      const action = deleteCampus(id, ownProps.history);
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
