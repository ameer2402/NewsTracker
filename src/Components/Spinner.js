import React, { Component } from 'react'
import loading from './loading.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='text-center' style={{display:'flex',justifyContent:"center",alignItems:"center"
    ,height:"100vh"}}>
        <img src={loading} alt="cant fetch it" />
      </div>
    )
  }
}

export default Spinner
