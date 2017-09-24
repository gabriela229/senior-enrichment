import React from 'react';
import {connect} from 'react-redux';

function AllCampuses(props){
  const {campuses} = props;
  return (
    <div className="row">
      {campuses.map( campus => {
        return (
          <div key={campus.id} className="col-md-4">
            <div className="thumbnail img-thumbnail" style={{minHeight: 300}}>
              <img src={campus.image} style={{maxHeight: 220}} />
              <div className="caption"><h4>{campus.name}</h4></div>
            </div>
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
