
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
  },

  actions: {
    createTodo: function(title) {
      if(!title) { return; }
      todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });
      todo.save();
      this.controllerFor('todos').set('newTitle', '');
    },
    deleteTodo: function(todo) {
      todo.destroyRecord();
    },
    toggleComplete: function(todo) {
      todo.toggleProperty('isCompleted');
      todo.save();
    }
  }
});


// components

Todo.TodoInputComponent = Ember.TextField.extend({
  didInsertElement: function () {
    this.$().focus();
  },
  actions: {
    createTodo() {
      sendAction('action', this.get('newTitle'));
    }
  }
});

Todo.TodoItemComponent = Ember.Component.extend({
  tagName: 'button',
  classNameBindings: [':todo-item', ':list-group-item', 
    'todo.isCompleted:completed'],
  attributeBindings: ['type'],
  type: 'button',

  click: function() {
    this.sendAction('toggleComplete', this.get('todo'));
  },

  actions: {
    delete() {
      this.sendAction('delete', this.get('todo'));
    }
  }
});


// controllers

