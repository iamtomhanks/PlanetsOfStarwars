//modules
import React, { Component } from 'react';

export const GraphInteractionModal = ({title, children}) => {
  return(
    <div className='graph-interaction-modal'>
      <div className='modal-title'>{title}</div>
      <div className='modal-data'>{children}</div>
    </div>
  )
}
