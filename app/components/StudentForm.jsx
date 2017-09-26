import React from 'react';
import {connect} from 'react-redux';
import {postStudent, writeStudent} from '../reducers';


function StudentForm(props) {
    const {handleSubmit, onChange, name, email, campuses, newStudent, history} = props;
    const address = history.location.pathname;
    return (
      <form className="well" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input onChange={onChange} name="name" className="form-control" type="text" value={name} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input onChange={onChange} name="email" className="form-control" type="text" value={email} />
        </div>
        <div className={`form-group  ${address === '/students' ? 'show' : 'hidden'}`}>
          <label htmlFor="campus">Campus</label>
          <select onChange={onChange} name="campusId" className="form-control" value={newStudent.campusId}>
            <option >--Select One--</option>
            {campuses.map( campus => {
              return (
                <option key={campus.id} value={campus.id}>{campus.name}</option>
              );
            })}
          </select>
        </div>
          <button className="btn btn-success btn-sm">Save</button>
          {' '}
          <button className="btn btn-warning btn-sm" onClick={props.toggleForm}>Cancel</button>
      </form>
    );
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    name: state.newStudent.name,
    email: state.newStudent.email,
    newStudent: state.newStudent
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit (event){
      event.preventDefault();
      const name = event.target.name.value;
      const email = event.target.email.value;
      const campusId = event.target.campusId.value * 1;
      dispatch(postStudent({name, email, campusId}, ownProps.history));
      dispatch(writeStudent({name: '', email: '', campusId: 0}));

    },
    onChange (event){
      const change = {};
      change[event.target.name] = event.target.value;
      dispatch(writeStudent(change));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
