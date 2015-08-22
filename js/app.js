
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
  tagName: 'li',
  classNameBindings: [':todo-item', ':list-group-item', 
    'isEditing:editing', 'todo.isCompleted:completed'],
  isEditing: false,
  attributeBindings: ['title'],

  title: Ember.computed('todo.isCompleted', function(){
    return this.get('todo.isCompleted') ? 
      'Click to mark as incomplete' : 'Click to mark as completed';
  }),

  click: function() {
    if(this.get('isEditing')){ return; }
    this.sendAction('toggleComplete', this.get('todo'));
  },

  actions: {
    edit() {
      this.set('isEditing', true);
      // because input is inside #if block and not currently inDom
      Ember.run.next(this, function(){
        this.$('input').focus();
      });
      return false;
    },
    cancel() {
      this.get('todo').rollbackAttributes();
      this.set('isEditing', false);
    },
    save() {
      this.get('todo').save();
      this.set('isEditing', false);
    },
    delete() {
      this.sendAction('delete', this.get('todo'));
    }
  }
});


// controllers

