function notFound(req, res) {
  res
    .status(404)
    .send(
      '<div><h1>The resource you are looking for does not exist</h1><p><a href="/index.html">Back to tasks</a></p></div>',
    );
}

module.exports = notFound;
