//modules
import React, { Component } from 'react';
import {connect} from 'react-redux';

//actions
import {getPlanetsRequest} from 'actions/planets'
import {updateActiveGraph} from 'actions/app'

//Styles
import 'styles/global.css'

//components
import Graph from './Graphs/Graph'

//constants
import {GraphReferences} from 'constants/graphs';
import {GraphTypes} from 'constants/graphs';

class App extends Component {
  constructor(props){
    super(props);

    this.props.getPlanetsRequest();
  }

  render() {
    const planets = this.props.planets.planets;
    // console.log(planets)
    return (
      <div className="app-component" style={{}}>
        {(planets.length > 0 && this.props.app.activeGraph == GraphReferences.PLANETS_BAR_GRAPH) &&
          <Graph
            data={planets}
            title={'Star Wars Planetary Information'}
            yAxis={{
              values:[
                {value:'name', label:'Name'}
              ]
              , axisLabel:'Names of Planets'}}
            xAxis={{values:[
              {value:'orbital_period', label:'Planetary Orbital Period In Days', interationText:function(value){return `${value} day orbital period`}},
              {value:'rotation_period', label:'Planetary Rotation Period In Hours', interationText:function(value){return `${value} hour rotational period`}}
            ]}}
            graphReference={GraphReferences.PLANETS_BAR_GRAPH}
            graphType={GraphTypes.BAR_GRAPH.type}
          >
            <ModeToggle state={GraphReferences.PLANETS_BAR_GRAPH} onClick={this.props.updateActiveGraph}/>
          </Graph>
        }
        {(planets.length > 0 && this.props.app.activeGraph == GraphReferences.PLANETS_SCATTER_PLOT) &&
          <Graph
            data={planets}
            title={'Star Wars Planetary Information'}
            yAxis={{values:[
              {value:'rotation_period', label:'Rotation Period In Months'}
            ]
            , axisLabel:'Names of Planets'}}
            xAxis={{values:[
              {value:'orbital_period', label:'Orbital Period In Months'}
            ]}}
            graphReference={GraphReferences.PLANETS_SCATTER_PLOT}
            graphType='ScatterPlot'
          >
            <ModeToggle state={GraphReferences.PLANETS_SCATTER_PLOT} onClick={this.props.updateActiveGraph}/>
          </Graph>
        }
      </div>
    );
  }
}

const ModeToggle = ({state,onClick}) => {
  if(state == GraphReferences.PLANETS_BAR_GRAPH) {
    return(
      <img src='/images/toggle-right.png' className='mode-toggle' onClick={() => onClick(GraphReferences.PLANETS_SCATTER_PLOT)}/>
    )
  }
  else if(state == GraphReferences.PLANETS_SCATTER_PLOT) {
    return(
      <img src='/images/toggle-left.png' className='mode-toggle' onClick={() => onClick(GraphReferences.PLANETS_BAR_GRAPH)}/>
    )
  }
  else return false;
}

export default connect(({planets, app}) => ({planets, app}) ,{
  getPlanetsRequest,
  updateActiveGraph
})(App);
