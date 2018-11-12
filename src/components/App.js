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
    if(planets.length == 0) {
      return(
        <img src='/images/loader.gif' className='app-loader'/>
      )
    }
    return (
      <div className="app-component">
        {(this.props.app.activeGraph == GraphReferences.PLANETS_BAR_GRAPH) &&
          <Graph
            data={planets}
            title={'Star Wars Planetary Information'}
            yAxis={{
              values:[
                {value:'name', label:'Names of Planets'}
              ]}}
            xAxis={{values:[
              {value:'rotation_period', label:'Planetary Rotation Period In Hours', interactionText:function(value){return `${value} hour rotational period`}},
              {value:'orbital_period', label:'Planetary Orbital Period In Days', interactionText:function(value){return `${value} day orbital period`}}
            ]}}
            graphReference={GraphReferences.PLANETS_BAR_GRAPH}
            graphType={GraphTypes.BAR_GRAPH.type}
          >
          </Graph>
        }
        {(this.props.app.activeGraph == GraphReferences.PLANETS_SCATTER_PLOT) &&
          <Graph
            data={planets}
            title={'Star Wars Planetary Information'}
            yAxis={{values:[
              {value:'orbital_period', label:'Orbital Period In Days'}
            ]}}
            xAxis={{values:[
              {value:'rotation_period', label:'Planetary Rotation Period In Hours',
                interactionText:function(value1, value2){return `${value1} hour rotational period vs ${value2} day orbital period`}},
              ]}}
            itemTitleValue='name'
            graphReference={GraphReferences.PLANETS_SCATTER_PLOT}
            graphType={GraphTypes.SCATTER_PLOT.type}
          >
          </Graph>
        }
        <ModeToggle state={this.props.app.activeGraph} onClick={this.props.updateActiveGraph}/>
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
