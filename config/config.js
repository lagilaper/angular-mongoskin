module.exports = {
  common: {
  	serverPort: 8080, 
    mongodb: {
    	port: 27017,
    	host: "localhost",
		dbname: "basic",
		options: "auto_reconnect"
    }
  },

  // Rest of environments are deep merged over `common`.

  development: {},
  test: {},
  production:  {}
};