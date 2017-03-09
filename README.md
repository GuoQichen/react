## QUICK START
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
- list items的"key"属性是必须的, "key"是一个字符串属性
    1. "key"的作用

        帮助React识别哪个item是改变, 增加和删除的, "key"只是给React使用, 不会传递到组件内部
    2. "key"的要求

        一个在siblings中独特的ID, 常用数据中的ID, 不推荐使用index作为ID, 因为速度慢, 影响性能
        ```
        const posts = [
        {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
        {id: 2, title: 'Installation', content: 'You can install React from npm.'}
        ];
        ```

    3. "key"只有在周围有数组的情况下才有意义

        例如, 取出ListItem作为组件, "key"不应在里面的li上, 而是应该在外面ListItem的组件上
    4. 简单的规则

        可以简单的记住, 在map的回调中, 如果有组件, 就需要"key"

### Forms
- 类型
    1. 受控制组件

        已经被提供一个value props, 不维持自己内部数据, 只是单纯的使用props
        - value

            如果input中指定了固定的value属性, 那么view的input的输入就没办法去修改, 但是可以使用onChange事件改变, event.target.value得到input的lavue, 然后去修改value属性, 这样可以对用户的输入进行限制
        - issues

            在checkbox和radio中, 为了规范checkbox和radio的输入变化, react监听浏览器的click事件来实现onChange事件,
            大多数情况下是没有问题的, 除了在change事件的事件处理程序中调用preventDefault
    2. 不受控制组件

        不受控制组件就是没有form提供的value props, 不受控组件不需要通过onChange事件来读取input的vlaue, 可以读取input的value通过DOM的引用
        - default value

            可以通过设置defaultValue属性在为不受控组件设置初始值, checkbox和radio支持defaultChecked, select支持defaultValue

- 交互的props

    form组件支持一些props通过用户的交互来改变
    - vlaue, `<input>`, `<textarea>`
    - checked, `<input>`中type为checkbox和radio
    - selected, `<option>`

- 在HTML中, 设置textarea的值通过`<textarea>hello, world</textarea>`, 但是在react中, 通过`<textarea value="helo world" />`来设置
- 对于`<input`>和`<textarea>`, 一般使用onChange
- onChange也可以简单理解为input改变的回调, 以下几种情况会触发回调
    - `<input>`, `<textarea>`改变value
    - `<input>`改变checked状态
    - `<option>`改变selected状态

- 晋级话题
    - 为什么需要受控组件

        为了避免一种情况
        ```
        <input type="text" name="title" value="Untitled" />
        ```
        初始状态的值是Untitled, 但是如果用户输入后, 节点的value改变了, 但是通过node.getAttribute('value')获得的值还是Untitled, React必须保持状态的一致性, 如果value值是设置的, 那么就应该一直是这种状态

    - 为什么textarea使用value

        因为已经有了vlaue和defaultValue, 如果在标签中写value显得没有必要, 而且React是在JS中而不是在HTML中, 如果我们想要另起一行没有字符串限制和可以使用`\u `

    - 为什么select需要value

        在React中, select的value属性可以取代option的selected属性, 非受控组件可以使用defaultValue属性,
        ```
        <select value="B">
        <option value="A">Apple</option>
        <option value="B">Banana</option>
        <option value="C">Cranberry</option>
        </select>
        ```
        可以通过使用multiple和给value传递一个数组实现选中多个

### Lifting State Up
有时几个组件需要把改变映射到数据上, 就推荐使用lifting共享的数据到最近的祖先, 如何实现呢, 首先, 我们有一个原则, 不修改props, 其次, 我们需要找到这几个组件最近的祖先, 数据应该被保存在祖先组件的state中, 子组件如果需要修改数据的话, 就调用祖先组件的回调函数, 就像JONP那样, 然后在祖先组件的回调函数中setState, 例如
```
<div>
  <TemperatureInput scale="c" value={celsius} onChange={this.handleCelsiusChange} />
  <TemperatureInput scale="f" value={fahrenheit} onChange={this.handleFahrenheitChange} />
  <BoilingVerdict celsius={parseFloat(celsius)} />
</div>
```
- 子组件如何传递数据到祖先组件

    由于子组件是input输入框, 所以监听onChange事件, 一旦数据发生改变, 就调用祖先组件的回调函数处理`e.target.vlaue`, 在祖先组件, 通过setState修改数据, 然后反应到子组件的props中
    ```
    handleChange(e) {
    this.props.onChange(e.target.value);
    }
    ```

### Composition vs Inheritance
React中达到代码的复用最好通过Composition而不是Inheritance
- 基本思想

    关键在于React中的props, React的组件是接受任意的props, 包括原始类型的值, ReactElement, function, 所以, 在React基本没有用到继承的场景, 都可以通过构造组件来实现
- props.children

    表示的是组件插入的后代, 是一个数组, 所以可以`{ props.children }`就可以被React自动展开
    ```
    function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
    }
    function WelcomeDialog() {
    return (
        <FancyBorder color="blue">
        <h1 className="Dialog-title">Welcome</h1>
        <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
        </FancyBorder>
    );
    }
    ```
- 组件的定制

    通过构造组件的模板, 通过props实现在不同应用场景下的定制
    ```
    //给props传递原始类型的值
    function Dialog(props) {
        return (
            <div>
                <h1 className="dialog-title" >{props.title}</h1>
                <p className="dialog-content" >{props.content}</p>
            </div>
        )
    }
    /给props传递ReactElement
    function Title(props) {
        return <h1>{props.title}</h1>
    }
    function Content(props) {
        return <p>{props.content}</p>
    }
    function Dialog(props) {
        return (
            <div>
                {props.title}
                {props.content}
            </div>
        )
    }
    ReactDOM.render(
    <Dialog title={<Title title="Welcome" />} content={<Content content="hello, guoqichen, welcome back" />} />,
    document.getElementById('root')
    );
    ```

### Thinking in React
从构建一个应用来感受React的思想, 一开始提供的只是设计图和JSON数据的API

1. 把UI分成一个个的模块

    可以把分出来的模块加上不同颜色的边框, 并且做好命名, 分模块的原则基本按照单一职责原则来, 一个模块应该只做一件事, 然后分好模块的层级

2. 先实现一个静态版本

    不要使用state来构建静态版本, 因为state只是需要交互的时候, 或者是在需要随时间变化的时候才使用. 构造出来的组件就只包含render方法. 在简单的项目, 可以从下往上构建, 在复杂的项目中, 可以从上往下构建

3. 确定UI state变化的最小组件

    需要更新全部, 只需要更新有差异的部分, 有三个简单的原则
    1. 是通过props从父元素传递的吗, 是的话就不需要state
    2. 随时间变化的吗, 不是的话就不需要state
    3. 可以基于组件的state或者props计算出来吗, 是的话就不需要state

4. 确定state存在哪里

    一个简单的原则就是, 存在需要共用这个state的组件的最近的公共祖先元素

5. 添加反向数据流

    子组件引起state的变化, 具体实现是调用保存state组件的回调函数

## ADVANCED GUIDES
### Specifying The React Element Type
1. React element编译后会直接引用已经命名后的变量，例如使用JSX<Foo />表达式，Foo必须在作用域当中
2. 因为JSX被编译成React.createElement，所以使用JSX必须引用React

#### Using Dot Notation for JSX Type
1. 可以在JSX中使用点操作符引用React component，这样做是方便一个单一模块可以export多个React components

    ```
    import React from 'react';
    const MyComponents = {
    DatePicker: function DatePicker(props) {
        return <div>Imagine a {props.color} datepicker here.</div>;
    }
    }
    function BlueDatePicker() {
    return <MyComponents.DatePicker color="blue" />;
    }
    ```

#### User-Defined Components Must Be Capitalized
1. 自定义组件以大写字母开头，小写字母开头会使用内建组件，例如`<div>`、`<span>`，编译后会以字符串'div'、'span'传递到React.createElement

#### Choosing the Type at Runtime 
1. 不能使用表达式作为React element类型，如果想要使用表达式指定element类型，必须先赋给一个大写的变量，实际运用中可以根据props渲染不同的组件

    ```
    // wrong!!
    const components = {
    photo: PhotoStory,
    video: VideoStory
    };
    function Story(props) {
    // Wrong! JSX type can't be an expression.
    return <components[props.storyType] story={props.story} />;
    }
    // -------------------------------
    // right!!
    const components = {
    photo: PhotoStory,
    video: VideoStory
    };
    function Story(props) {
    // Correct! JSX type can be a capitalized variable.
    const SpecificStory = components[props.storyType];
    return <SpecificStory story={props.story} />;
    }
    ```

### Props in JSX
在JSX有几种不同的方式指定props
1. JavaScript Expressions
    
    `<MyComponent foo={1 + 2 + 3 + 4} />`，传递进MyComponent组件的props.foo会是计算过的10，注意，`if`语句和`for`循环不是JS表达式，所以不能直接在JSX中使用，而是在JSX附近的代码中使用
    ```
    function NumberDescriber(props) {
        let description;
        if (props.number % 2 == 0) {
            description = <strong>even</strong>;
        } else {
            description = <i>odd</i>;
        }
        return <div>{props.number} is an {description} number</div>;
    }
    ```
2. String Literals
3. Props Default to "True" 
    
    如果一个props没有值，那它的默认值是true，这样的行为是为了和HTML保持一致
    ```
    // 以下两个表达式是相等的
    <MyTextBox autocomplete />
    <MyTextBox autocomplete={true} />
    ```
    但是，不推荐使用这个写法，容易和ES6的对象属性简写混淆，`{foo}`是`{foo:foo}`的简写而不是`{foo:true}`
4. Spread Attributes

    如果已经有了一个props对象想要传递进JSX，可以使用`...`spread操作符传递整个对象
    ```
    // 以下两个表达式是相等的
    function App1() {
        return <Greeting firstName="Ben" lastName="Hector" />;
    }
    // ... spread operator
    function App2() {
        const props = {firstName: 'Ben', lastName: 'Hector'};
        return <Greeting {...props} />;
    }
    ```
    如果多个组件需要同样的props容器，可以使用`...`spread操作符传递同样的props，但是有可能传递一些不相干的属性，所以需要根据实际情况来使用

### Children in JSX
JSX表达式包含一个开标签和闭标签，这些标签的内容被传递到特殊的props，`props.children`

1. String Literals

    HTML是未转义的，所以可以和写HTML一样写JSX的String Literals，还有JSX标签中的前后的空格和新的一行会被省略，String Literals中的多个空格会被当成一个
2. JSX Children 

    可以用来显示嵌套组件
3. JavaScript Expressions
4. Functions as Children

    `props.children`和`props`一样，可以接受任何数据类型，包括函数，所以可以给`props.children`指定一个回调函数
    ```
    function Parent(props) {
        return <div>{props.children('hello')}</div>
    }
    function Foo() {
        return (
            <Parent>
                {(param)=><div>{param}</div>}
            </Parent>
        )
    }
    ```
5. Booleans, Null, and Undefined Are Ignored 

    ```
    // 一样的结果
    <div />
    <div></div>
    <div>{false}</div>
    <div>{null}</div>
    <div>{undefined}</div>
    <div>{true}</div>
    ```
    1. Booleans可以条件渲染React elements，
    2. 但是falsy的值仍然会被渲染出来而不是转换成false，例如0

        ```
        // wrong
        <div>
        {props.messages.length &&
            <MessageList messages={props.messages} />
        }
        </div> 
        // right
        <div>
        {props.messages.length > 0 &&
            <MessageList messages={props.messages} />
        }
        </div>
        ```

### Typechecking With PropTypes
1. 出于性能考虑，`propTypes`只在开发模式下检查类型
2. 可以通过`React.PropTypes.element`来指定只有一个child

    ```
    class MyComponent extends React.Component {
    render() {
        // This must be exactly one element or it will warn.
        const children = this.props.children;
        return (
        <div>
            {children}
        </div>
        );
    }
    }
    MyComponent.propTypes = {
    children: React.PropTypes.element.isRequired
    };
    ```
3. 类型检查也可以用在`defaultProps`中，`defautProps`会在类型检查之前设置
4. 没有写`isRequire`，表示的是可以这个prop可以没有，但是一旦设置，就必须满足类型检查

### Refs and the DOM
1. 什么时候使用Refs，能使用声明式变量来控制的就不需要使用Refs

    - 管理focus，文字选中，媒体回放
    - 触发必要的动画
    - 和第三方DOM库整合
2. ref的callback会在组件mount和unmount之后立即执行

    - 在组件mount之后执行callback的时候，参数是DOM元素
    - 在组件unmount之后执行callback的时候，参数是null
3. 直接把DOM元素挂在class上是使用DOM元素常用的方式，也是推荐的方式`ref={input => this.input = input }`
4. ref可以attach到任何元素上，包括自定义的元素

    - 如果自定义元素是使用class的方式定义的，那么callback中的参数就是自定义组件的instance，就是class的instance
    - 如果自定义元素是使用functional的方式定义的，返回的就是null，也就是说，**不能在使用function定义的自定义元素上使用ref**，因为没有instance，
    - 在function的自定义组件中是可以使用ref的，`ref={input => textInput = input}`， 赋给一个声明过的变量就可以

        ```
        function CustomTextInput(props) {
            // textInput must be declared here so the ref callback can refer to it
            let textInput = null;
            function handleClick() {
                textInput.focus();
            }
            return (
                <div>
                <input
                    type="text"
                    ref={(input) => { textInput = input; }} />
                <input
                    type="button"
                    value="Focus the text input"
                    onClick={handleClick}
                />
                </div>
            );  
        }
        ```
5. 使用字符串声明ref的方式已经弃用了

    ```
    // 字符串声明
    ref = "textInput"
    // 使用this.refs调用
    this.refs.textInput
    ```

### Uncontrolled Components
1. 大多数情况下，推荐使用受控组件来实现表单，在受控组件中，表单数据被React组件处理，而在非受控组件中，数据由DOM元素自己处理
2. 非受控组件一般不需要event来监听数据的改变，而是和ref搭配起来用，然后直接拿到input的value

    ```
    class NameForm extends React.Component {
        constructor(props) {
            super(props);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
        handleSubmit(event) {
            alert('A name was submitted: ' + this.input.value);
            event.preventDefault();
        }
        render() {
            return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" ref={(input) => this.input = input} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            );
        }
    }
    ```
3. 在React渲染的生命周期中，form元素的value会覆盖DOM元素的value
4. 一般不受控组件可以和defaultValue组合使用
5. `<input type="checkbox">` 和 `<input type="radio">` 支持`defaultChecked`， `<select>`支持`defaultValue`

### Optimizing Performance
1. 使用生产环境构建，在使用webpack的情况下使用uglify插件

    ```
    new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: JSON.stringify('production')
    }
    }),
    new webpack.optimize.UglifyJsPlugin()
    ```
2. 使用chrome timeline做组件的的性能分析，可以看到组件的mount，update，unmount，性能分析出来的数字是相对的，在生产环境中性能可能会更优越，性能分析的意义在于，能够看到在update的过程中哪些组件update了，是否有不需要update的组件update，同时也能看到组件update的频率
3. Avoid Reconciliation

    React在内部构建和维护渲染后的UI的表示，它包括你的组件返回的React组件，这个表现让React避免创建DOM节点和对DOM节点不必要的访问，操作DOM比操作javascript对象慢得多，有时它称为虚拟DOM，但是和React Native的工作方式一样，当一个组件props和state改变的时候，React通过比较最新返回的element和之前的element来决定有没有必要升级DOM
4. 通过shouldComponentUpdate来优化

    通过手动判断，只在有变化的时候shouldComponentUpdate返回true，以下是手动操作的例子
    ```
    class CounterButton extends React.Component {
        constructor(props) {
            super(props);
            this.state = {count: 1};
        }
        shouldComponentUpdate(nextProps, nextState) {
            if (this.props.color !== nextProps.color) {
                return true;
            }
            if (this.state.count !== nextState.count) {
                return true;
            }
            return false;
        }
        render() {
            return (
                <button
                    color={this.props.color}
                    onClick={() => this.setState(state => ({count: state.count + 1}))}>
                    Count: {this.state.count}
                </button>
            );
        }
    }    
    ```
    当时当组件开始复杂的时候，手动去比较就显得很麻烦，所以React提供了一个helper--`React.PureComponent`，所以下面这个例子和上面的效果是一致的
    ```
    class CounterButton extends React.PureComponent {
        constructor(props) {
            super(props);
            this.state = {count: 1};
        }

        render() {
            return (
            <button
                color={this.props.color}
                onClick={() => this.setState(state => ({count: state.count + 1}))}>
                Count: {this.state.count}
            </button>
            );
        }
    }    
    ```
    `React.PureComponent`内部比较是通过`shallow comparing`来实现，即浅比较，所以只有在props和state的数据类型是原始类型的时候，`React.PureComponent`才能够正常工作，即不会发生mutate（突变）的数据才能用来比较，例如一个数组，click之后往数组push一项，这样数据就mutate了，`shallow comparing`的结果是相等的，DOM不会更新，但是实际上数据发生了改变
5. The Power Of Not Mutating Data，所以最简单的避免上述情况是使用不会发生突变的数据结构

    - 下面这个例子，通过concat，使数据的改变被识别

        ```
        handleClick() {
            this.setState(prevState => ({
                words: prevState.words.concat(['marklar'])
            }));
        }    
        ```
    - 使用ES6数组的Spread语法

        ```
        handleClick() {
            this.setState(prevState => ({
                words: [...prevState.words, 'marklar'],
            }));
        };        
        ```
    - 使用ES6的Object.assign方法

        ```
        // before
        function updateColorMap(colormap) {
            colormap.right = 'blue';
        }        
        // after 
        function updateColorMap(colormap) {
            return Object.assign({}, colormap, {right: 'blue'});
        }
        ```
    - 使用ES6对象的Spread语法（只是提议，但是Create React App这个脚手架是可以使用的）
6. 解决这个问题的另一个方法是`Immutable.js`

