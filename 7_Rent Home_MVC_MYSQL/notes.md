For Mysql, we installe `mysql2` package, which is a MySQL client for Node.js that supports promises and async/await.
>>npm i mysql2

in SQL WHERE IN () similar to JOIN CLAUSE

Here are examples of both `WHERE IN` and `JOIN` clauses:

**Using `WHERE IN`:**
```sql
SELECT * FROM table1
WHERE column1 IN (SELECT column2 FROM table2 WHERE condition);
```

**Using `JOIN`:**
```sql
SELECT table1.*
FROM table1
JOIN table2 ON table1.column1 = table2.column2
WHERE table2.condition;
```
Both queries retrieve rows from `table1` where `column1` matches values from `table2` based on a condition.


>> To give warning before form resubmission by browser. in in the form attribute `onsubmit` you can use the following code:

<form onsubmit="this.querySelector('button[type=submit]').disabled=true;">
    <!-- form fields here -->
</form>

>> To give more powerful warning before form resubmission by browser, you can use the following code in the res:

```js
res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
res.set('Pragma', 'no-cache');
res.set('Expires', '0');
```

>> Always use PRG (Post/Redirect/Get) pattern to prevent form resubmission issues.In POST handler never render any page, always redirect to GET handler.And there is no need to use `res.render()` in POST handler, just use `res.redirect()`.

>> To pass the data just fetch thing directly from the database in the GET handler and pass it to the view.

>> To use `res.locals` to pass data to the view, you can do it like this:
```js
app.get('/your-route', (req, res) => {
    res.locals.data = yourData; // Set data to res.locals
    res.render('your-view'); // Render the view
});
```

>> ALso u can use session to pass the data in req with `req.session.data = yourData;` and then access it in the view.
