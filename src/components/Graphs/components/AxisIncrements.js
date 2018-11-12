//modules
import React, { Component } from 'react';

export const AxisIncrements = ({maxValue,axis,graphComponentRef}) => {
  let values = [];

  for(let i = 0; i < 11; i++) {
    values.push({value: (maxValue / 10) * i, position: i * 10});
  }

  let containerStyle = {};

  if(axis == 'y'){
    values[0] = '';
    values.reverse();
    if(graphComponentRef)containerStyle.height = graphComponentRef.getBoundingClientRect().width;
  }

  return (
    <div className={`${axis}-axis-labels`} style={containerStyle}>
      {values.map((value, index) => {
        const elementPosition = value.position + '%';
        let style = {};
        if(axis=='x')style.left = elementPosition;
        if(axis=='y')style.bottom = elementPosition;
        return(
          <div className={`${axis}-axis-increment`} style={style} key={index}>
            {value.value}
          </div>
        )
      })}
    </div>
  )
}
