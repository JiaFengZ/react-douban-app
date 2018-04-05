import React, { Component } from 'react';
import '../../style.css';

class FilmDetail extends Component {
    constructor(props) {
        super(props);
        this.data = props.data;    
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
                    <i onClick={goback}>&lt;电影</i>
                    <span>{detailInfo.title}</span>
                </div>
            )
        }

        function ImgInfo(props) {
            return (
                <div className="detail-img"><img src={detailInfo.images&&detailInfo.images.large} height="300"/></div>
            )
        }

        function Detail(props) {
            return (
                <div className="detail-content">
                    <strong>简介</strong><br/>
                    <label>名称：</label>{detailInfo.title}<span>{detailInfo.genres&&detailInfo.genres.map((item,index) => <span className="tag-label" key={index}>{item}</span>)}</span><br/>
                    <label>上映时间：</label>{detailInfo.year}<br/>
                    <label>导演：</label><span>{detailInfo.directors&&detailInfo.directors.map((item,index) => <span className="tag-label bg-blue" key={item.id}>{item.name}</span>)}</span><br/>
                    <strong>演员</strong><br/>
                    <p className="cast-img">{detailInfo.casts&&detailInfo.casts.map((item,index) => <img height="120" key={index} src={item.avatars&&item.avatars.large}/>)}</p>
                </div>
            )
        }

        return (
            <div className="detail-page">
                <Title/>
                <ImgInfo/>
                <Detail/>
            </div>
        )
    }
}

module.exports = FilmDetail;