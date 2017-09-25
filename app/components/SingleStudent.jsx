import React from 'react';
import {connect} from 'react-redux';

function SingleStudent(props){
  const {students} = props;
  const currentStudent = students.filter( student => {
    return student.id === props.match.params.studentId * 1;
  })[0];

  return (
    <div>
    {currentStudent ?
      <div>
      <h1>{currentStudent.name}</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Campus</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
              <tr key={currentStudent.id}>
                <th scope="row">{currentStudent.id}</th>
                <td>{currentStudent.name}</td>
                <td>{currentStudent.campus.name}</td>
                <td><button className="btn btn-danger">Delete</button></td>
              </tr>
        </tbody>
      </table>
      </div>
      : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    students: state.students,
    campuses: state.campuses
  };
};

export default connect(mapStateToProps)(SingleStudent);
