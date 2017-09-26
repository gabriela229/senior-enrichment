import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {fetchStudent, writeStudent, updateStudent, deleteStudent} from '../reducers';

class SingleStudent extends Component {
  constructor(){
    super();
    this.state = {
      showForm: false
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleForm(){
    this.setState({showForm: !this.state.showForm});
  }
  handleSubmit(){
    this.props.saveStudent(this.props.newStudent);
    this.toggleForm();
  }

  render(){
    const {students, campuses, match, updateCurrentStudent, newStudent, onChange, removeStudentOnClick} = this.props;
    const {showForm} = this.state;
    const {toggleForm, handleSubmit} = this;
    const currentStudent = students.filter( student => {
      return student.id === match.params.studentId * 1;
    })[0];

    return (
      <div>

        <div>
        <h1>{currentStudent.name}</h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Campus</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { showForm === true ?
                <tr key={newStudent.id} >
                  <th scope="row">{newStudent.id}</th>
                  <td><input className="form-control" name="name" onChange={onChange} value={newStudent.name} type="text" /></td>
                  <td><input className="form-control" name="email" onChange={onChange} value={newStudent.email} type="text" /></td>
                  <td>
                  <select  onChange={onChange} name="campusId" className="form-control" value={newStudent.campusId}>
                  <option value="none">--Select One--</option>
                  {campuses.map( campus => {
                    return (
                      <option key={campus.id} value={campus.id}>{campus.name}</option>
                    );
                  })}
                </select>
                  </td>
                  <td><button onClick={handleSubmit} className="btn btn-primary">Save</button>{' '}<button onClick={toggleForm} className="btn btn-warning">Cancel</button>{' '}<button value={newStudent.id} className="btn btn-danger" onClick={removeStudentOnClick}>Delete</button></td>
                </tr>
                :
                <tr key={currentStudent.id}>
                  <th scope="row">{currentStudent.id}</th>
                  <td>{currentStudent.name}</td>
                  <td>{currentStudent.email}</td>
                  <td><NavLink to={`/campuses/${currentStudent.campusId}`}>{currentStudent.campus.name}</NavLink></td>
                  <td><button
                  onClick={() => {
                    updateCurrentStudent(currentStudent.id);
                    toggleForm();
                    }
                  } className="btn btn-primary">Edit</button>{' '}<button value={currentStudent.id} className="btn btn-danger" onClick={removeStudentOnClick}>Delete</button></td>
                </tr>
            }
          </tbody>
        </table>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    campuses: state.campuses,
    newStudent: state.newStudent
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateCurrentStudent(id){
    const action = fetchStudent(id);
    dispatch(action);
    },
    onChange (event){
      const change = {};
      change[event.target.name] = event.target.value;
      dispatch(writeStudent(change));
    },
    saveStudent (student){
      dispatch(updateStudent(student, ownProps.history));
      dispatch(writeStudent({name: '', email: '', campusId: 0}));
    },
    removeStudentOnClick (event){
      const id = event.target.value * 1;
      const action = deleteStudent(id, ownProps.history);
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
