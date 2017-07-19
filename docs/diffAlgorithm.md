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

## render
首先, `render()`返回的就是virtual dom，那么diff-algorithm的作用就是和上一次`render()`的virtual dom来比较，得到需要patch的部分，
然后更新DOM，所以，在`render()`中return的就必须是virtual dom

```js
// Stateful Component
class Greet extends Component {
    render() {
        return (
            <div>helloworld</div>
        )
    }
}
// Stateless Component 
const Greet = () => <div>helloworld</div>
```

实际上virtual dom只是`native Javascript tree structure`，jsx只是语法糖，`render()`只是描述了你想要的UI是怎样的

```js
const h = require('virtual-dom/h')
const vTree = h('div.foo#some-id', [
    h('span', 'some text'),
    h('input', { type: 'text', value: 'foo' })
])
```

注意，**当`this.setState()`调用的时候，当前组件以及children都会re-render**，所以如果在整个App的root component调用`this.setState()`就会导致整个App re-render，所以尽量避免在root component调用`this.setState()`

还有一个可以优化的点在于`shouldComponentUpdate()`，因为当前组件使用`this.setState()`会导致当前组件和children都会re-render，为了避免不必要的re-render，子组件可以在`shouldComponentUpdate`hook返回false


## reference
[React’s diff algorithm by Christopher Chedeau](https://calendar.perfplanet.com/2013/diff/)
[Why is React's concept of Virtual DOM said to be more performant than dirty model checking? --- stackoverflow](https://stackoverflow.com/questions/21109361/why-is-reacts-concept-of-virtual-dom-said-to-be-more-performant-than-dirty-mode/21117404#21117404)
