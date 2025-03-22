// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  // WebSocket proxy configuration
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      ws: true, // enable WebSocket proxy
      changeOrigin: true
    })
  );
};

// src/index.js (additional WebSocket error handling)
const connectWithRetry = () => {
  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = (event) => {
    console.log('WebSocket disconnected', event);
    // Attempt to reconnect after 5 seconds
    setTimeout(connectWithRetry, 5000);
  };
};

connectWithRetry();