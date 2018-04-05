import React, { Component } from 'react';
import '../../style.css';

class BookList extends Component {

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
                      <div className="left-img"><img src={item.image} width="90" height="105"/></div>
                      <div className="right-info">
                        <label>名称：</label><span className="info-label">{item.title}</span><br/>
                        <span>{item.tags&&item.tags.map((item,index) => <span className="tag-label" key={index}>{item.name}</span>)}</span><br/>                               
                        <label>作者：</label><span className="info-label color-gray">{item.author}</span><br/>
                        <label>评分：</label><span className="info-label">{item.rating&&item.rating.average}</span><br/>
                        <label>时间：</label><span className="info-label">{item.pubdate}</span>
                      </div>
                    </li>
                  )}
                </ul>
          </div>
        );
    }
}

module.exports = BookList;