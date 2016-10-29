import React from 'react';
import ReactDOM from 'react-dom';

const numbers = [1,2,3,4,5,6]
const listItems = numbers.map(item => {
    <li>{item}</li>
} )

ReactDOM.render(
  <ul>
      {listItems}
  </ul>,
  document.getElementById('root')
);