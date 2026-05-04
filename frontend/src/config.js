const config = {
  development: {
    API_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    WS_URL: 'ws://localhost:5000',
  },
  production: {
    API_URL: process.env.REACT_APP_API_URL,
    WS_URL: process.env.REACT_APP_WS_URL || 'wss://your-backend-url.onrender.com',
  },
};

const env = process.env.REACT_APP_ENV || 'development';
export default config[env];