import React from 'react';
import {connect} from 'react-redux';

function SingleCampus(props){
  console.log(props);
  const {students} = props;
  const campusStudents = students.filter( student => {
    return student.campusId === props.match.params.campusId * 1;
  });
  return (
    <div>
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
                <th scope="row">{student.id}</th>
                <td>{student.name}</td>
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
    students: state.students
  };
};

export default connect(mapStateToProps)(SingleCampus);
