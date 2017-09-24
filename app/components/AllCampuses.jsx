import React from 'react';
import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';


function AllCampuses(props){
  const {campuses} = props;
  return (
    <div className="row">
      {campuses.map( campus => {
        return (
          <div key={campus.id} className="col-md-4">
            <NavLink to={`/campuses/${campus.id}`} activeClassName="active">
              <div className="thumbnail img-thumbnail" style={{minHeight: 300}}>
                <img src={campus.image} style={{maxHeight: 220}} />
                <div className="caption"><h4>{campus.name}</h4></div>
              </div>
            </NavLink>
          </div>
          );
        })
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campuses
  }
}

export default connect(mapStateToProps)(AllCampuses);
