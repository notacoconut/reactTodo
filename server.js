var fs            = require('fs'),
    path          = require('path'),
    express       = require('express'),
    bodyParser    = require('body-parser');

var app = express();

var TODO_FILE = path.join(__dirname, 'todos.json');

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/api/todos', function(req, res){
  fs.readFile(TODO_FILE, function(err, data){
    if(err){
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});
app.post('/api/todos', function(req, res){
  fs.readFile(TODO_FILE, function(err, data){
    if(err){
      console.error(err);
      process.exit(1);
    }
    var todos = JSON.parse(data);

    var newTodo = {
      id: Date.now(),
      task: req.body.task,
      edited: req.body.edited,
      complete: req.body.complete
    };
    todos.push(newTodo);
    fs.writeFile(TODO_FILE, JSON.stringify(todos, null, 4), function(err){
      if(err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(todos);
    });
  });
});

app.listen(process.env.PORT || 3000, function(){
  console.log('Server was started on port 3000!');
});