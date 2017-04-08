module.exports = function(deployTarget) {  
  return {
    pagefront: {
      app: 'pilas-engine',
      key: process.env.PAGEFRONT_KEY
    }
  };
};
