// todo react component
  // TODOLIST
      //TODOS
          //TODO
      //TODO FORM


var data = [
  {id:1, task: "Mow the Lawn", edited: false, complete: true},
  {id:2, task: "Feed the cat", edited: true, complete: false} 
];

var TodoList = React.createClass({
  render: function() {
    return ( 
      <div className='todoList'> 
        <h1> MY TO-DO LIST </h1>
          <Todos data={this.props.data}>     
          </Todos>
      </div>
    );
  }
});

var Todos = React.createClass({
  render: function(){
    var todoNode = this.props.data.map(function(todo){
      return(
        <Todo task={todo.task} key={todo.id} edited={todo.edited} complete={todo.complete}>
        </Todo>
      );
    });
    return (
      <div className='todoContainer'>
        <h3> HELLO THESE ARE THE TODOS </h3>
          {todoNode}
      </div>
    );
  }
});

////Todos object components

////

var Todo = React.createClass({
  getInitialState: function() {
    if(this.props.complete){
      return({checked: true, editing: false, edited: false, task: this.props.task});
    }
    return {checked: false, editing: false, edited: false, task: this.props.task};
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
        {this.state.edited ? <label> - Edited </label>: null}
        
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
  handleChange: function(e){
    var newState=e.target.value;
    this.setState({value: newState});
    this.props.textChangeCallback(newState);
  },
  render: function(){
    return (
      <input 
        type='text' 
        value={this.state.value} 
        onChange={this.handleChange}
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
  <TodoList data={data}/>,
  document.getElementById('content')
);