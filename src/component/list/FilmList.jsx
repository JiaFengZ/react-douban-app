import React, { Component } from 'react';
import '../../style.css';

class FilmList extends Component {

  
    seeDetail(data) {
        this.props.seeDetail(true, data);
    }

    constructor(props) {
        super(props);
        this.seeDetail = this.seeDetail.bind(this);
    }
  
    render() {
        return (
          <div className="list-content">
                <ul>
                  {this.props.listItems.map((item) => 
                    <li key={item.id} onClick={this.seeDetail.bind(this, item)}>
                      <div className="left-img"><img src={item.images&&item.images.small} width="90" height="105"/></div>
                      <div className="right-info">
                        <label>名称：</label><span className="info-label">{item.title}</span><br/>
                        <span>{item.genres&&item.genres.map((item,index) => <span className="tag-label" key={index}>{item}</span>)}</span><br/>                                
                        <label>导演：</label><span className="info-label">{item.directors&&item.directors.map((item,index) => <span className="tag-label bg-blue" key={index}>{item.name}</span>)}</span><br/>
                        <label>评分：</label><span className="info-label">{item.rating&&item.rating.average}</span>
                      </div>
                    </li>
                  )}
                </ul>
          </div>
        );
    }
}

module.exports = FilmList;