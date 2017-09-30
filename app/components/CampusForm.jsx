import React, {Component} from 'react';
import {connect} from 'react-redux';
import {postCampus, resetError} from '../reducers';


class CampusForm extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      image: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange(event){
    const change = {};
    change[event.target.name] = event.target.value;
    this.setState(change);
  }
  onSubmit(event){
    event.preventDefault();
    const name = event.target.name.value;
    const image = event.target.image.value;
    this.props.handleSubmit({name, image});
    this.setState({name: '', image: ''});
  }
  componentWillUnmount(){
    this.props.clearError();
  }
  render(){
    const {error, toggleForm} = this.props;
    const {name, image} = this.state;
    const {onSubmit, onChange} = this;
    return (
      <form className="well" onSubmit={onSubmit}>
      {error.length > 0 ? <div className="alert alert-danger">{error}</div> : null}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input onChange={onChange} name="name" className="form-control" type="text" value={name} />
        </div>
        <div className="form-group">
          <label htmlFor="image">Campus Image Url</label>
          <input onChange={onChange} name="image" className="form-control" type="text" value={image} />
        </div>
          <button className="btn btn-success btn-sm">Create Campus</button>
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
    handleSubmit (campus){
      dispatch(postCampus(campus, ownProps.history));
    },
    clearError(){
      dispatch(resetError(''));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);
