### 介绍JSX
- 两种形式, 单行和多行
```
//单行
const element = <h1>hello, world</h1>
//多行, 使用圆括号, 避免被自动插入分号
const element = (
    <h1>
        hello, {formatName(user)}!
    </h1>
)
```
- JSX => JS对象 =>
    1. 可以放在if语句中
    2. 可以放在for循环中
    3. 可以赋给一个变量
    4. 可以作为函数的参数
    5. 可以作为函数的返回值

- JSX属性
    1. ""字符串
    2. {}表达式
    3. 驼峰命名法, class => className, tabindex => tabIndex

- JSX后代
    1. 没有后代, 使用 `/>` 立即关闭
    2. 否则和HTML一样直接插入后代
    3. 如果后代是数组, jsx会自动展开数组

- JSX不用担心注入攻击
- 简单总结
JSX和React.createElement() => React elements (页面上你想要呈现的元素) => React会解析React elements去构建DOM和呈现最新数据

### 渲染元素
- 'root'DOM, 页面上真实的DOMelement, 里面的内容由ReactDOM来管理
```
<div id="root"></div>
```
- 把React element渲染成rootDOM的节点, 使用`ReactDOM.render()`
- React elements是一个一旦创建就不可变的对象, 表示某个时间点的UI状态, 例如电影中某个点得关键帧, 所以更新UI只能创建新的element
- React元素只会更新需要的部分

### Components和props
- 目的
把UI切成独立的, 可复用的快, 只需要思考每一块的实现
- 理解
从概念上来理解, component类似于js function, 接受任意的输入(props), 返回一个表示如何出现在屏幕上得React elements
- 组件的类型, 从React的角度来说两种写法是等价的
    1. Functional
```
function Welcome(props) {
    return <h1>hello, {props.name}</h1>
}
```
    2. Class
```
class Welcome extends React.Compontent {
    render() {
        return <h1>hello, {this.props.name}</h1>
    }
}
```
- 当React遇到一个元素表示用户的自定义组件时, 它将把JSX属性作为一个单独的对象传递给component, 这个对象就是props
- Compontents可以引用其他的Compontents作为返回 => 使我们使用组件抽象任何层次的细节 => 在React中, 任何常见的表达都可以作为组件
- 小写表示DOM标签, 大写表示Compontent,
```
<div />
<Welcome />
```
- Compontent只能返回单一的root element, 所以多个标签需要使用容器包裹起来
```
function App() {
  return (
    <div>
      <Welcome name="James" />
      <Welcome name="Acky" />
      <Welcome name="Alex" />
    </div>
  )
}
```
- 当一个UI需要在多个地方重复使用, 就可以抽象成组件, 想象成你拥有一个组件组成的调色盘, 你正在开发的APP是一副画
- pure和impure  => pure function => ReactComponent必须像pure function那样对待props => props === Read-only
    1. 不改变输入, 同样的输入返回同样的结果就是pure
    2. 改变输入就是impure

### State和Lifecycle
- State和props相似, 但是他是私有的和完全由组件控制的
- 组件的class写法相对于functionial增加了local state和lifecycle hook
- lifecycle hook
Component第一次被渲染到DOM, 称为mounting, 当组件不需要使用的时候, 我们需要移除的时候, 称为unmounting
```
componentDidMount() {} //当组件的输出已经被渲染到DOM
componentWillUnmount() {} //
```
- state值得注意的事
    1. 不要直接修改
```
this.state.commit = 'hello' //wrong
this.setState({commit: 'hello'})//correct
```
    2. 因为state的更新可能是异步的, 你不应该依赖他们的值计算下一个状态, 所以setState()有另一种用法
setState()可以接受一个函数而不是一个对象, 函数的第一参数是上一次的state, 第二个参数是那个时间点更新后的props
    3. State更新不是重置而是Merged, 所以可以分开单独去更新
- "top-down", "unidirectional"(单向) data flow
组件树的数据是自上而下的单向数据流, 可以想象成一个瀑布, 中间不管那个组件需要用到数据, 只要向瀑布中拿就可以, 但是瀑布还是一直向下的, 而且组件也不关心数据是来自父组件的state, proprs还是手动填写, 也无从知道

### Handling Events
- 与DOM事件相识, 只是由一些语法上得区别
    1. 使用驼峰命名
    2. 在JSX中, 传递一个函数作为事件的处理程序而不是字符串

```
//HTML
<button onclick="activateLasers()">
  Activate Lasers
</button>
//React
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
- 阻止默认事件必须使用`e.preventDefault()`
- event对象不是原生的, 是合成过的包含W3C标准的event对象
- 在React, 一般不需要在DOM元素创建好以后调用addEventListener, add一个监听器到DOM元素上, 而是当DOM初始渲染的时候添加一个listener
- 使用ES6的语法, 常用的是, 使event handler作为class的一个method
- JSX回调中的this默认是空的, 所以如果忘记`bind(this)`, 当回调被调用的时候, this就是undefined, 例如event的listener就是一个回调函数, 简单来记就是, 在React中, 如果指向一个方法后面没有(), 就应该`bind(this)`
    1. property initializer syntax, 但是还是实验性的写法
    2. arrow function, this的值绑定的是arrow function所在的上下文环境
但是由一点性能问题, 如果arrow function传给子组件, 子组件可能重复渲染

### Conditional Rendering
- 与js中的条件语句相同
- 常见思路, true和false不同的状态分别写两个组件, 根据判断来取决使用哪个组件
- 简写
    1. 逻辑运算符, &&
```
{unreadMessages.length > 0 &&
  <h2>
    You have {unreadMessages.length} unread messages.
  </h2>
}
```
    2. 三元运算符

- 阻止组件的渲染 => 通过条件判断来实现, 不想在页面上呈现就`return null`

### List and Keys


