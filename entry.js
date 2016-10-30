import React from 'react';
import ReactDOM from 'react-dom';

class SearchBar extends React.Component {


    render() {
        return (
            <form method="get" action="/">
                <input placeholder="Search..." />
                <label htmlFor="stock" >
                    <input type="checkbox" id="stock" />
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
        return (
            <ul>
                <li>{this.props.title}</li>
                <ProductsRow
                    stock={this.props.stock}
                    name={this.props.name}
                    price={this.props.price} />
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
                <ProductsTable
                    title={this.props.title}
                    stock={this.props.stock}
                    name={this.props.name}
                    price={this.props.price}
                />
            </div>
        )
    }
}


class Filter extends React.Component {

    render() {
        return (
            <div>
                <SearchBar />
                <Products
                    title={this.props.category}
                    stock={this.props.stocked}
                    name={this.props.name}
                    price={this.props.price}
                />
            </div>
        )
    }
}


const data = {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"}

// const data = [
//   {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
//   {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
//   {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
//   {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
//   {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
//   {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
// ];

ReactDOM.render(
    <Filter
        title={data.category}
        stock={data.stocked}
        name={data.name}
        price={data.price}
    />,
    document.getElementById('root')
);