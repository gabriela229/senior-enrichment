import React, {Component} from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';
import CampusForm from './CampusForm';


class AllCampuses extends Component {
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
    const {campuses, history} = this.props;
    const {showForm} = this.state;
    const {toggleForm} = this;
    return (
      <div>
        <h1>Campuses</h1>
        <div className="row">
          <div className="col-md-6">
        {showForm === true ?
          <CampusForm toggleForm={toggleForm} history={history} />
          :
          <div className="form-group">
            <button onClick={toggleForm} className="btn btn-success ">Add Campus</button>
          </div>
        }
          </div>
        </div>
        <div className="row">
          {campuses.map( campus => {
            return (
              <div key={campus.id} className="col-md-4">
                <NavLink to={`/campuses/${campus.id}`} activeClassName="active">
                  <div className="thumbnail" style={{border: 'none'}}>
                    <img className="img-rounded" src={campus.image} style={{minHeight: 250, minWidth: 250, maxWidth: 250}} />
                    <div className="caption"><h4 className="text-center">{campus.name}</h4></div>
                  </div>
                </NavLink>
              </div>
              );
            })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses,
    name: state.name,
    image: state.image
  };
};

export default connect(mapStateToProps)(AllCampuses);
