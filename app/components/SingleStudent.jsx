import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import { updateStudent, deleteStudent} from '../reducers';

class SingleStudent extends Component {
  constructor(){
    super();
    this.state = {
      showForm: false,
      id: 0,
      name: '',
      email: '',
      campusId: 0
    };
    this.toggleForm = this.toggleForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  toggleForm(){
    const {id, name, email, campusId} = this.props.students.filter( student => {
      return student.id === this.props.match.params.studentId * 1;
    })[0];
    this.setState({showForm: !this.state.showForm, id, name, email, campusId});
  }
  handleSubmit(){
    const {id, name, email, campusId} = this.state;
    this.props.saveStudent({id, name, email, campusId});
    this.toggleForm();
  }
  onChange (event){
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }

  render(){
    const {campuses, students, match, removeStudentOnClick} = this.props;
    const {showForm, id, name, email, campusId} = this.state;
    const {toggleForm, handleSubmit, onChange} = this;
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
                <tr key={id} >
                  <th scope="row">{id}</th>
                  <td><input className="form-control" name="name" onChange={onChange} value={name} type="text" /></td>
                  <td><input className="form-control" name="email" onChange={onChange} value={email} type="text" /></td>
                  <td>
                  <select  onChange={onChange} name="campusId" className="form-control" value={campusId}>
                  <option value="none">--Select One--</option>
                  {campuses.map( campus => {
                    return (
                      <option key={campus.id} value={campus.id}>{campus.name}</option>
                    );
                  })}
                </select>
                  </td>
                  <td><button onClick={handleSubmit} className="btn btn-primary">Save</button>{' '}<button onClick={toggleForm} className="btn btn-warning">Cancel</button>{' '}<button value={id} className="btn btn-danger" onClick={removeStudentOnClick}>Delete</button></td>
                </tr>
                :
                <tr key={currentStudent.id}>
                  <th scope="row">{currentStudent.id}</th>
                  <td>{currentStudent.name}</td>
                  <td>{currentStudent.email}</td>
                  <td><NavLink to={`/campuses/${currentStudent.campusId}`}>{currentStudent.campus.name}</NavLink></td>
                  <td><button
                  onClick={() => {
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
    campuses: state.campuses
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    saveStudent (student){
      dispatch(updateStudent(student, ownProps.history));
    },
    removeStudentOnClick (event){
      const id = event.target.value * 1;
      const action = deleteStudent(id, ownProps.history);
      dispatch(action);
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);
