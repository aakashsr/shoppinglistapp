import React, { Component } from "react";
import "./App.css";


class Formheading extends Component{
  render() {
    return <h2>Shopping List</h2>;
  }
}

class Form extends Component {
  render() {
    const {
      value,
      handleChange,
      addItem,
      inputIsEmpty
    } = this.props;
    return (
      <div>
        <form onSubmit={addItem}>
          <input
            type="text"
            placeholder="Enter New Item"
            value={value}
            onChange={handleChange}
          />
          <button disabled={inputIsEmpty()}>Add</button>
        </form>
      </div>
    );
  }
}

class ItemsList extends Component {
  render() {
    const {  
      items
    } = this.props;
    return (
      <div>
        <p className="items">Items</p>
        <ol className="item-list">
          {items.map((item, index) => (
            <Item key={index} item={item} />
          ))}
        </ol>
      </div>
    );
  }
}

class Item extends Component {
  render() {
    const {
      index,
      item
    } = this.props ;
    return (
       <li key={index}>{item}</li>
    )
  }
}

class Button extends Component {
  render() {
    const {
      deleteLastItem,
      noItemsFound
    } = this.props;
    return (
      <button onClick={deleteLastItem} disabled={noItemsFound()}>
        Delete Last Item
      </button>
    );
  }
}


class App extends Component {
  state = {
    value: "",
    items: []
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  addItem = event => {
    event.preventDefault();
    this.setState(oldState => ({
      items: [...oldState.items, this.state.value]
    }));
  };

  deleteLastItem = event => {
    this.setState(prevState => ({ items: this.state.items.slice(0, -1) }));
  };

  inputIsEmpty = () => {
    return this.state.value === "";
  };

  noItemsFound = () => {
    return this.state.items.length === 0;
  };

  render() {
    return (
      <div className="App">
        <Formheading />
        <Form
          value={this.state.value}
          handleChange={this.handleChange}
          addItem={this.addItem}
          inputIsEmpty={ this.inputIsEmpty}
        />
        <Button
          deleteLastItem={this.deleteLastItem}
          noItemsFound={this.noItemsFound}
        />
        <ItemsList
          items={this.state.items}
        />
      </div>
    );
  }
}

export default App;
