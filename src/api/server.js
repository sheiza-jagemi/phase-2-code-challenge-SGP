// api/server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json'); // Path to your db.json
const middlewares = jsonServer.defaults();

server.use(middlewares);
// You can add custom routes here if needed, before the main router
server.use(jsonServer.rewriter({
  '/api/*': '/$1', // Optional: if you want to prepend /api to your routes
  '/product/:resource/:id/show': '/:resource/:id' // Example custom rewrite
}));
server.use(router);

// Vercel serverless functions don't listen on a port in the traditional sense,
// but you might keep this for local testing or if the server is used in a specific way.
// For Vercel, the important part is exporting the server.
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000 (for local development)');
});

// Export the Server API module for Vercel
module.exports = server;