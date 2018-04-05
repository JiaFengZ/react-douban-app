import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import './style.css';
import NavBar from './component/navBar/NavBar';
import SearchBar from './component/SearchInput/SearchInput';
import List from './component/list/List';
import  DetailPage from './component/detailPage/DetailPage';

class App extends Component {
	constructor(props) {	    
	    super(props);
	    this.state = {page: 'book', dataOffset: 0, resetInput: true, detailShow: false, detailInfo: null, listItems: []};
	    this.changePage = this.changePage.bind(this);    
        this.seeDetail = this.seeDetail.bind(this);      
        this.search = this.search.bind(this);  
        this.getData = this.getData.bind(this);
        this.loadMore = this.loadMore.bind(this);
        this.refresh = this.refresh.bind(this);
	}

    //切换底部导航
	changePage(value) {
		this.setState({
			page: value,
            listItems: [],
            resetInput: true,
            dataOffset: 0
		}, function() {
            this.getData(this.state.page, '', this.state.dataOffset);
        });
              
	}

    //下拉加载更多
    loadMore(callback) {
        console.log('loadmore');
        this.setState({
            dataOffset: this.state.dataOffset + 20
        }, function() {
            this.getData(this.state.page, '', this.state.dataOffset, true, callback);
        });
    }

    //上拉刷新
    refresh(callback) {
        console.log('refresh');
        this.setState({
            dataOffset: 0
        }, function() {
            this.getData(this.state.page, '', this.state.dataOffset, false, callback);
        });
    }

    //查看详情页
    seeDetail(value, data) {
        console.log(data);
        this.setState({
            detailShow: value,
            detailInfo: data
       })
    }

    search(value) {
        this.setState({
            listItems: [],
            resetInput: false
        }, function() {
            this.getData(this.state.page, value, this.state.dataOffset);
        })
    }

    //获取列表数据
    getData(type, searchInput, start, isUnion, callback) {

        const params = {
            'book': ['https://api.douban.com/v2/book/search?q=', '图书', 'bookList', 'books'],
            'film': ['https://api.douban.com//v2/movie/search?q=', '电影', 'filmList', 'subjects'],
            'music': ['https://api.douban.com/v2/music/search?q=', '音乐', 'musicList', 'musics']
        };

 
        const param = searchInput || params[type][1];
        const that = this;
        fetchJsonp(encodeURI(params[type][0]+ param + '&start=' + start)).then(function(res) {
            return res.json();          
        }).then(function(data) {
              let listItems;
              if (isUnion) {
                  that.state.listItems.map(function(a) {
                        let len = data[params[type][3]].length;
                        while (len -- ) {
                          if (data[params[type][3]][len].id == a.id) {
                              data[params[type][3]].splice(len, 1);
                              break;
                          }
                          listItems = that.state.listItems.concat(data[params[type][3]]).filter(function(item) {
                              return !!item.id;
                          });
                      }
                  });
            } else {
                listItems = data[params[type][3]].filter(function(item) {
                    return !!item.id;
                });
            }
                
            that.setState({
                listItems: listItems
            }, function() {
                callback && callback();
            });
        }).catch(function(err) {
          console.log(err);
        });
    }

    componentDidMount() {
        this.getData(this.state.page);
    }
    
    render() {
        return (
	        <div className="app">
                <SearchBar search={this.search} page={this.state.page} resetInput={this.state.resetInput}/>
                <List page={this.state.page} seeDetail={this.seeDetail} listItems={this.state.listItems} refresh={this.refresh} loadMore={this.loadMore}/>
                <NavBar page={this.state.page} changePage={this.changePage}/>
                <DetailPage page={this.state.page} detailShow={this.state.detailShow} detailInfo={this.state.detailInfo} seeDetail={this.seeDetail}/>
	        </div>
        );
    }
}

module.exports = App;


