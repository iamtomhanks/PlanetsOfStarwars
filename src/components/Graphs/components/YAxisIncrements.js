import React from 'react';

const XAxisValueSelect = ({xAxisValues, selectedValue, onChange}) => {
  return (
    <div className='x-axis-label'>
      <select onChange={(e) => onChange(e.target.value)} value={selectedValue}>
        {xAxisValues.map((xAxisValue, index) => {
          return(
            <option key={index} value={xAxisValue.value}>
              {xAxisValue.label}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default XAxisValueSelect;
