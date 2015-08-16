Todo = Ember.Application.create();

Todo.Router.map(function() {
  // put your routes here
});

Todo.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});
