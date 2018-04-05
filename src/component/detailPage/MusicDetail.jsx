import React, { Component } from 'react';
import '../../style.css';

class MusicDetail extends Component {
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
                    <i onClick={goback}>&lt;音乐</i>
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
                        <label>作者：</label><span className="info-label">{item.author&&item.author.map((item,index) => <span className="tag-label bg-blue" key={index}>{item.name}</span>)}</span><br/>
                        <label>发布商：</label><span className="info-label">{item.attrs&&item.attrs.publisher}</span><br/>
                        <label>发布时间：</label><span className="info-label">{item.attrs&&item.attrs.pubdate}</span><br/>
                        <label>评分：</label><span className="info-label">{item.rating&&item.rating.average}</span><br/>
                        <span className="info-label">{item.tags&&item.tags.slice(0, 4).map((item,index) => <span className="tag-label" key={index}>{item.name}</span>)}</span><br/>  
                    </div>
                </div>
            )
        }

        function Detail(props) {
            return (
                <div className="detail-content">                             
                    <strong>简介</strong>
                    <p>{detailInfo.summary}</p>
                    <strong>内容</strong>
                    <p>{detailInfo.attrs&&detailInfo.attrs.attrs}</p>
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

module.exports = MusicDetail;