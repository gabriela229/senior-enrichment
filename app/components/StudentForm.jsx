import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postStudent, resetError} from '../reducers';


class StudentForm extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      email: '',
      campusId: 0
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange (event){
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
    this.props.clearError();
  }
  onSubmit(event){
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const campusId = event.target.campusId.value * 1;
    this.props.handleSubmit({name, email, campusId});
    this.setState({name: '', email: '', campusId: 0});
  }
  componentWillUnmount(){
    this.props.clearError();
  }
  render(){
    const {campuses, history, error, toggleForm, singleCampusId} = this.props;
    const {name, email } = this.state;
    const {onChange, onSubmit} = this;
    const address = history.location.pathname;
    return (
      <form className="well" onSubmit={onSubmit}>
        {error.length > 0 ? <div className="alert alert-danger">{error}</div> : null}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input onChange={onChange} name="name" className="form-control" type="text" value={name} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input onChange={onChange} name="email" className="form-control" type="text" value={email} />
        </div>
        <div className={`form-group  ${address === '/students' ? 'show' : 'hidden'}`}>
          <label htmlFor="campusId">Campus</label>
          <select onChange={onChange} name="campusId" className="form-control" value={singleCampusId}>
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
          <button className="btn btn-warning btn-sm" onClick={toggleForm}>Cancel</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    error: state.error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit (student){
      dispatch(postStudent(student, ownProps.history));
    },
    clearError(){
      dispatch(resetError(''));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
