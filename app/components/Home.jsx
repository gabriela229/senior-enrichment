import React, {Component} from 'react';
// import {connect} from 'react-redux';
import { NavLink } from 'react-router-dom';


export default function Home () {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center">Welcome Pokémon Academy!</h1>
          <br />
        </div>
      </div>
      <div className="row">
            <div className="col-md-4 col-md-offset-2">
              <NavLink to="/campuses" activeClassName="active">
                <div className="thumbnail img-thumbnail" style={{minHeight: 300, border: 'none'}}>
                  <img src="https://files.thetriangle.org/assets/pokemon/ball-poke.png" style={{ maxHeight: 220, minWidth: 220, minHeight: 220}} />
                  <div className="caption text-center"><h4>View Campuses</h4></div>
                </div>
              </NavLink>
            </div>
            <div className="col-md-4">
              <NavLink to="/students" activeClassName="active">
                <div className="thumbnail img-thumbnail" style={{border: 'none'}}>
                  <img src="https://az616578.vo.msecnd.net/files/2016/03/03/6359261755711975951478293709_pokemon_by_nazzirithe-d37o34p.jpg" style={{ maxHeight: 220, minWidth: 220, minHeight: 220}} />
                  <div className="caption text-center"><h4>View Students</h4></div>
                </div>
              </NavLink>
            </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     campuses: state.campuses,
//     name: state.name,
//     image: state.image
//   };
// };

// export default connect(mapStateToProps)(Home);
