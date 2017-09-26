import React from 'react';
import {connect} from 'react-redux';
import {postCampus, writeCampus} from '../reducers';


function CampusForm(props) {
    const {handleSubmit, onChange, name, image} = props;
    return (
      <form className="well" onSubmit={handleSubmit}>
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
          <button className="btn btn-warning btn-sm" onClick={props.toggleForm}>Cancel</button>
      </form>
    );
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    name: state.newCampus.name,
    image: state.newCampus.image
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSubmit (event){
      event.preventDefault();
      const name = event.target.name.value;
      const image = event.target.image.value;
      dispatch(postCampus({name, image}, ownProps.history));
      dispatch(writeCampus({name: '', image: ''}));

    },
    onChange (event){
      const change = {};
      change[event.target.name] = event.target.value;
      dispatch(writeCampus(change));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CampusForm);
