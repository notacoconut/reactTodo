// todo react component
  // TODOLIST
      //TODOS
          //TODO
'use strict';

var TodoList = React.createClass({
  getInitialState: function(){
    return {data: []};
  },
  loadTodosFromServer: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url,status, err.toString());
      }.bind(this)
    });
  },
  handleSave: function(todo){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: todo,
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function(){
    this.loadTodosFromServer();
  },
  render: function() {
    return ( 
      <div className='todoList'> 
        <h1> MY TO-DO LIST </h1>
          <Todos data={this.state.data}>     
          </Todos>
      </div>
    );
  }
});
var toolbar = React.createClass({
  render: function() {
    return(
      <div className='toolbar'>
        <addButton />
        <saveButton />
      </div>
    );
  }
});
////toolbar components
var addButton = React.createClass({

});
var saveButton = React.createClass({
  
});
//
var Todos = React.createClass({
  render: function(){
    var todoNode = this.props.data.map(function(todo){
      return(
        <Todo task={todo.task} key={todo.id} complete={todo.complete}>
        </Todo>
      );
    });
    return (
      <div className='todoContainer'>
          {todoNode}
      </div>
    );
  }
});

var Todo = React.createClass({
  getInitialState: function() {
    if(this.props.complete){
      return({checked: this.props.complete, editing: false, edited: false, task: this.props.task});
    }
    return {checked: this.props.complete, editing: false, edited: false, task: this.props.task};
  },
  onCompleteChange: function(newState){
    this.setState({checked: newState});
  },
  onTextChange: function(newState){
    this.setState({task: newState,  edited: true});
  },
  onEditClick: function(){
    this.setState({editing: !this.state.editing});
  },
  render: function() {
    var todoClassName;
    if(this.state.checked){
      todoClassName = 'todo complete-todo';
    }
    else{
      todoClassName = 'todo';
    }
    return (
      <div className={todoClassName}>
        <ToggleComplete
          initChecked={this.state.checked} 
          completeChangeCallback={this.onCompleteChange}
        />
        { this.state.editing ? 
          <TodoInput value={this.props.task} textChangeCallback={this.onTextChange}/> : 
          <label className='todo-label'> {this.state.task} </label>
        }
        {this.state.edited ? <label className='edited-label'> - Edited </label>: null}
        
        {this.state.checked ? null : <button onClick={this.onEditClick}> Edit </button>}
        
      </div>
    );
  }
});

/////Todo object Components
var TodoInput = React.createClass({
  getInitialState: function(){
    return ({value: this.props.value});
  },
  handleTextChange: function(e){
    var newState=e.target.value;
    this.setState({value: newState});
    this.props.textChangeCallback(newState);
  },
  render: function(){
    return (
      <input 
        type='text' 
        value={this.state.value} 
        onChange={this.handleTextChange}
      />
    );
  }
});

var ToggleComplete = React.createClass({
  getInitialState: function() {
      return{checked: this.props.initChecked};
  },
  handleChange: function(e){
      var newState = !this.state.checked
      this.setState({checked: newState});
      this.props.completeChangeCallback(newState);
  },
  render: function(){
    return (
      <input  
        type='checkbox' 
        checked={this.state.checked} 
        onChange={this.handleChange}
      /> 
    );
  }
});
/////

ReactDOM.render(
  <TodoList url='api/todos'/>,
  document.getElementById('content')
);