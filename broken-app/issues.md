# Broken App Issues

**Missing middleware to parse JSON** <br>
- Needed to add `express.json()` to parse JSON request bodies. Without this, the `req.body` would be undefined when trying to access `developers` from the incoming request.

**Handling Async Code in `Array.map()`**
- Promises need to be handled with `Promise.all()` in the `Array.map()` method in order to resolve all promises.

**Error handling**
- `err` is not defined in the `catch` block. It is missing as a parameter.
