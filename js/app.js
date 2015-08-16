
// app
Todo = Ember.Application.create();

Todo.ApplicationAdapter = DS.LSAdapter.extend({
  namespace: 'todo'
});


// models
Todo.Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean')
});


// routes
Todo.Router.map(function() {
  this.route('todos', {path: '/todos'});
});

Todo.IndexRoute = Ember.Route.extend({
  beforeModel: function() {
    this.replaceWith('todos');
  }
});

Todo.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('todo');
  }
});


// components


// controllers

