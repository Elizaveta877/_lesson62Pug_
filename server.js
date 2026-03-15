const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

const users = [
  { id: 1, name: 'Alice', bio: 'Alice is a software engineer with 5 years of experience.' },
  { id: 2, name: 'Bob', bio: 'Bob is a project manager who loves hiking.' },
  { id: 3, name: 'Charlie', bio: 'Charlie is a designer with a passion for art.' }
]

const articles = [
  { id: 1, title: 'Introduction to Node.js', content: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine...' },
  { id: 2, title: 'Getting Started with Express', content: 'Express is a minimal and flexible Node.js web application framework...' },
  { id: 3, title: 'Understanding Middleware', content: 'Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application\'s request-response cycle...' }
] 

app.get('/', (req, res) => {
  res.send('Welcome to the homepage!');
});

app.get('/users', (req, res) => {
  res.render('users.pug', { users });
});

app.get('/users/:userId', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.userId));

  if (!user) {
    return res.status(404).send('User not found');
  }
  res.render('user.pug', { user });
});

app.get('/articles', (req, res) => {
  res.render('articles.ejs', { articles });
  
});

app.get('/articles/:articleId', (req, res) => {
  const article = articles.find(a => a.id === parseInt(req.params.articleId));

  if (!article) {
    return res.status(404).send('Article not found');
  }
  res.render('article.ejs', { article });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});