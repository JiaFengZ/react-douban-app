import React, { Component } from 'react';
import '../../style.css';

class BookDetail extends Component {
	constructor(props) {
      	super(props);
        this.goback = this.goback.bind(this); 
  	} 

    goback() {
        this.props.seeDetail(false);
    }	

  	render() {
  	    const goback = this.goback;	
        const detailInfo = this.props.detailInfo;
        function Title(props) {
            return (
                <div className="detail-title">
                    <i onClick={goback}>&lt;图书</i>
                    <span>{detailInfo.title}</span>
                </div>
            )
        }

        function BriefInfo(props) {
            const item = detailInfo;
            console.log(item);
            return (
                <div className="brief-content">
                    <div className="left-img"><img src={item.image} width="125" height="150"/></div>
                    <div className="right-info">
                        <label>名称：</label><span className="info-label">{item.title}</span><br/>                                                                             
                        <label>作者：</label><span className="info-label color-gray">{item.author}</span><br/>
                        <label>出版社：</label><span className="info-label">{item.publisher}</span><br/>
                        <label>日期：</label><span className="info-label">{item.pubdate}</span><br/>
                        <label>评分：</label><span className="info-label">{item.rating.average}</span><br/>
                        <label>价钱：</label><span className="info-label">{item.price}</span><br/>
                        <span className="info-label">{item.tags.slice(0, 4).map((item,index) => <span className="tag-label" key={index}>{item.name}</span>)}</span><br/>  
                    </div>
                </div>
            )
        }

        function Detail(props) {
            return (
                <div className="detail-content">                             
                    <strong>简介</strong>
                    <p>{detailInfo.summary}</p>
                    <strong>作者简介</strong>
                    <p>{detailInfo.author_intro}</p>
                </div>
            )
        }

        return (
  			<div className="detail-page">
  				<Title/>
	  			<BriefInfo/>
	  			<Detail/>
  			</div>
  		)
  	}
}

module.exports = BookDetail;