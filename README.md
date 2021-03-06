# 一个用react构建的豆瓣书籍/电影/音乐在线资源搜索的小应用
[演示页面](https://jiafengz.github.io/react-douban-app/dist/index.html)
## 1 实现的功能
* 1、底部导航
* 2、电影、音乐、书籍列表页搜索展示
* 3、点击列表项目跳转详情页
* 4、下拉刷新、上拉加载更过

## 2 开发的主要难点以及解决方案
### 2.1 组件的设计与组件间通信
  根据项目预期目标，把整个应用分成4个组件：顶部搜索框、底部导航栏、列表页、详情页。
4个相对独立的组件，要解决最大的问题就是组件间的通信，导航栏切换更改的是导航栏的自身状态，要把状态的切换通知给列表页组件，触发列表页状态的更新和重新render。搜索框输入值的变化也要通知列表组件，进而更新渲染。    
  导航栏和搜索框进行了状态提升，把 page 值和 searchInput 值存储在 App.jsx 顶级父组件中，App.jsx 通过 props 把回调函数传递给导航组件和搜索组件，导航栏切换和搜索输入值变化后调用这个回调函数，实现状态值的更新，触发列表页的更新render

### 2.2 详情页和列表页的跳转设计
  逻辑上来说详情页是从属于列表页的，但是由于展示详情页时是覆盖整个 app 页面的，因此把详情页组件置于跟列表页、导航、搜索组件平行的位置，展示详情页时通过css控制详情页定位覆盖app页面的其他内容，这样子从详情页返回列表页时列表、导航、搜索组件的状态都得以保持。不知道这样设计是否足够合理，只是目前而言实现了功能。

### 2.3 结合第三方库
  使用了fetch-jsonp 和 jquery 两个第三方库。
通过fetch-jsonp拉取服务器上的数据，由于获取数据是异步的，要先渲染没有填充数据的组件，待获取到数据后再次更新渲染组件。在 componentDidMount 阶段初次发出ajax请求数据，导航切换和搜索输入则是通过更新 listItems 状态值触发数据更新。  
实现上拉加载更多和下拉刷新时使用了 jquery，在组件的 componentDidMount 阶段绑定滚动事件，判断上拉到底和下拉到顶的动作，进而触发页面数据加载刷新的动作。

## 3 其他
  react 是单向数据流，通过 state 的更新触发组件更新渲染，组件间通过 props 进行数据通信以及事件传递，觉得比较困难的就是的状态的统一管理和组件间的数据通信，虽然说这个豆瓣口袋功能简单、应用结构也不复杂，但是 state 的同步和 props 的传递是最大的难点，当应用组件层级加深，数据的复杂度增加，可能就需要额外的工具帮助了，比如说redux。
