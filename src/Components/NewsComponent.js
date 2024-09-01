import React, { Component } from 'react';
import defaultImage from "./newstemplate.jpg";

export class NewsComponent extends Component {
  render() {
    let { title, description, imageUrl, newsUrl,author,date,source} = this.props;
    const imagesize={
      width:'287px',
      height:'200px',
      
  
    };
    return (
      <div>
        <div className="card my-2" style={{ width: "100%" }}>
          <img src={imageUrl?imageUrl:defaultImage} className="card-img-top w-100" alt="..." style={imagesize} />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <span className="badge text-bg-danger">{source}</span>
            <p className="card-text">{description}...</p>
            <p className="card-text"><small className="text-dark">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="_blank" rel="noreferrer noopener" className="btn btn-sm btn-primary">Read More..</a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsComponent;
