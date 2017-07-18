# diff-algorithm and render

先从React Updating的生命周期开始:
- `componentWillReceiveProps(nextProps)`

    使用`this.seState()`不会调用`componentWillReceiveProps`这个方法，只有接受到新的props的时候才会调用这个hook
- `shouldComponentUpdate(nextProps, nextState)`

    默认返回`true`, 如果返回`false`, `render()`函数不会被调用
- `componentWillUpdate(nextProps, nextState)`

    `render()`之前的lifecycle
- `render()`

    `render()`调用后返回virtual dom
- `componentDidUpdate(prevProps, prevState)`

    `render()`之后的lifecycle


## updating的过程
当React组件中使用了`this.setState()`或者组件接收到新的prop的时候会导致React进入Updating的lifecycyle, 如果`shouldComponentUpdate()`没有返回`false`的话, 那么virtual dom就会构建, virtual dom之后, 与之前的virtual dom进行diff, 得出diff后virtual dom，最后更新浏览器中的DOM

## diff-algorithm


## reference
[React’s diff algorithm by Christopher Chedeau](https://calendar.perfplanet.com/2013/diff/)
[Why is React's concept of Virtual DOM said to be more performant than dirty model checking? --- stackoverflow](https://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode/21117404#21117404)
