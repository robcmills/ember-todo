Ember Todo
==========

The classic todo app implemented with Ember-2.0.0 and Bootstrap-4.0

![ember-todo](http://i.imgur.com/QdYJci1.png)


```bash
# sync local -> s3

aws s3 sync  \
  ~/code/ember/ember-todo  \
  s3://robcmills.net/ember-todo  \
  --exclude '*.DS_Store'  \
  --exclude '*.pyc'  \
  --exclude '.git/*'  \
  --exclude 'env/*'  \
  --dryrun
```