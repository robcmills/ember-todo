
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
    saveTodo: function(todo) {
      todo.save();
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
  tagName: 'li',
  classNameBindings: [':todo-item', ':list-group-item', 
    'isEditing:editing', 'todo.isCompleted:completed'],
  isEditing: false,

  click: function() {
    if(this.get('isEditing')){ return; }
    this.sendAction('toggleComplete', this.get('todo'));
  },

  actions: {
    edit() {
      console.log('item edit action');
      this.set('isEditing', true);
      Ember.run.next(this, function(){
        this.$('input').focus();
      });
      return false;
    },
    save() {
      console.log('item save');
      this.set('isEditing', false);
      this.sendAction('save', this.get('todo'));
    },
    delete() {
      this.sendAction('delete', this.get('todo'));
    }
  }
});


// controllers

