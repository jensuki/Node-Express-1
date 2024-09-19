### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

Callbacks, Promises, Async/Await, Event looping (setTimeout).

- What is a Promise?

A Promise is an object that represents represents the eventual resolvement/completiion or failure of some async operation and its value. It represents a value that may be available now, later, or never. It also makes it easier to handle async opeartions in a more clean and structured manner. Multiple promises can be chained together using then() and handle errors with catch().

- What are the differences between an async function and a regular function?

**Regular Function** - Returns a value directly or 'undefined' if no value is returned.<br>
**Async Function** - Always returns a Promise. If a value is returned inside a function, it is automatically wrapped in a Promise that promise will eventually give you the value.

**Regular Function** - Cannot pause for something to finish. We have to use callbacks or promises in order to deal with tasks that take more time.<br>
**Async Function** - Can pause and wait for something to finish using 'await' keyword, which allows the function to be paused until a promise is resolved, making it easier to work with tasks that take time.

**Regular Function** - Handles errors in promises by using .catch() or by passing error callbacks.<br>
**Async Function** - We can use 'try...catch' inside the async function to handle errors in a more intuitive and cleaner manner.

- What is the difference between Node.js and Express.js?

**Node.js** is a runtime environment that allows you to run Javascript code outside of the browser. It is mainly used for building server-side applications. With Node.js, we can create our own servers, handle files, databases, and perform other backend tasks.

**Express.js** is a web application framework that is built on top of Node.js. It simplifies the process of building web applications and API's by providing tools/features to handle routes, middleware, and HTTP requests. While Node.js allows you to create the server, Express.js makes it easier to organize and manage the code for web applications.

- What is the error-first callback pattern?

In the error-first callback pattern, the callback function that is passed to some async operation will always except the first argument to be an error (if there is one), and the second argument will be the result (if successful).

**How it works:**<br>
If the operator fails, the error is passed as the first argument, and the result is 'null' or 'undefined'.<br>
If the operation succeeds, the first error argument is 'null' (indicating no error), and the result is passed as the second argument.


```javascript
fs.readFile('file.txt', 'utf8', function (err, data) {
  if (err) {
    // Handle the error
    console.error("Error reading file:", err);
    return;
  }
  // Handle the success
  console.log("File contents:", data);
});

- What is middleware?

**Middleware** refers to functions in a web application that sit in between the request-response cycle. Middleware functions have access to the request object (`request`), the response object (`response`), and the `next()` function, which is used to pass control to the next middleware in the stack

**Example**:
```javascript
app.use((req, res, next) => {
  console.log('Request received at:', new Date());
  next();  // Pass control to the next middleware or route handler
});
```

- What does the `next` function do?

The `next` function is used inside **middleware** functions in frameworks in order pass control from one middleware function to the next in the request-response cycle.

**How it works:**<br>
When a middleware function finishes its task, it calls `next()` to move to the next middleware OR route handler. If `next()` is not called, the request will be left hanging which prevents further code from executing because the server will stop responding.


**Example:**<br>

```javascript
app.use((req, res, next) => {
  console.log('First middleware');
  next();  // Passes control to the next middleware
});

app.use((req, res, next) => {
  console.log('Second middleware');
  res.send('Response from second middleware');
});
```

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
The `await` calls are sequential, which causes unnecessary delays. The users names are returned in a different order than how they are fetched. Instead we can use `Promise.all()` to fetch all the users together:

```javascript
async function getUsers() {
  const [elie, joel, matt] = await Promise.all([
    $.getJSON('https://api.github.com/users/elie'),
    $.getJSON('https://api.github.com/users/joelburton'),
    $.getJSON('https://api.github.com/users/mmmaaatttttt')
  ]);
  return [elie, joel, matt];
}
```