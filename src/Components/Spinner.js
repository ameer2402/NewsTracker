import React, { Component } from 'react';

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-5' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '20vh'}}>
        <div className="modern-spinner"></div>
      </div>
    )
  }
}

export default Spinner;
