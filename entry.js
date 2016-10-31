import React from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends React.Component {

    constructor(props) {
        super(props)
        this.textChange = this.textChange.bind(this)
        this.stockChange = this.stockChange.bind(this)
    }

    textChange(e) {
        this.props.textChange(e.target.value)
    }

    stockChange(e) {
        this.props.stockChange(this.refs.stock.checked)
    }



    render() {
        return (
            <form method="get" action="/">
                <input placeholder="Search..." value={this.props.fileterText} onChange={this.textChange}  /><br />
                <label htmlFor="stock" >
                    <input type="checkbox" id="stock"  checked={this.props.isStocked} onChange={this.stockChange} ref="stock" />
                    Only show products in stock
                </label>
            </form>
        )
    }
}


/*
props:
stock => true/false
name => products name
price => products price
 */
function ProductsRow(props) {

    return (
        <li>
            <span className={props.stock ? "products-name" : "products-name-unstock"} >
                {props.name}
            </span>
            <span className="products-price" >
                {props.price}
            </span>
        </li>
    )
}

/*
props:
title => category name
stock => true/false
name => products name
price => products price
 */
class ProductsTable extends React.Component {
     
    render() {
        let rows = []
        let lastCategory = null
        this.props.data.forEach((item) => {

            if( !item.name.includes(this.props.fileterText) || ( this.props.isStocked && !item.stocked) ) {return}


            if( item.category !== lastCategory ) {
                rows.push(<li className="products-category" key={item.category} >{item.category}</li>)
                lastCategory = item.category
            }
            rows.push(<ProductsRow stock={item.stocked} name={item.name} price={item.price} key={item.name} />)
        })

        return (
            <ul>
                {rows}
            </ul>
        )
    }
}


class Products extends React.Component {


    render() {
        return (
            <div>
                <h3 className="products-title" >
                    <span>Name</span>
                    <span>price</span>
                </h3>
                <ProductsTable data={this.props.data} fileterText={this.props.fileterText} isStocked={this.props.isStocked} />
            </div>
        )
    }
}


class Filter extends React.Component {
    constructor(props) {
        super(props)
        this.handleText = this.handleText.bind(this)
        this.handleStock = this.handleStock.bind(this)
        this.state = {
            fileterText: '',
            isStocked: false,
        }
    }

    handleText(str) {
        this.setState({
            fileterText: str,
        })
    }

    handleStock(arg) {
        this.setState({
            isStocked: arg,
        })
    }

    render() {
        return (
            <div>
                <SearchBar textChange={this.handleText}  stockChange={this.handleStock} stocked={this.state.isStocked} />
                <Products data={data} fileterText={this.state.fileterText} isStocked={this.state.isStocked} />
            </div>
        )
    }
}



const data = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

ReactDOM.render(
    <Filter data={data} />,
    document.getElementById('root')
);