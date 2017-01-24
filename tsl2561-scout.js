
const options = require('./options');

const Scout = require('zetta-scout');
const tsl2561 = require('./tsl2561');
const util = require('util');

const Tsl2561Scout = module.exports = function(opts) {
    
  // see if any of the options were overridden in the server

  if (typeof opts !== 'undefined') {
    // copy all options defined in the server
    for (const key in opts) {
      if (typeof opts[key] !== 'undefined') {
        options[key] = opts[key];
      }
    }
  }

  Scout.call(this);
};

util.inherits(Tsl2561Scout, Scout);

Tsl2561Scout.prototype.init = function(next) {

  const self = this;

  const Tsl2561 = new tsl2561(options);

  const query = this.server.where({name: 'TSL2561'});
  
  this.server.find(query, function(err, results) {
    if (results[0]) {
      self.provision(results[0], Tsl2561, options);
      self.server.info('Provisioned TSL2561');
    } else {
      self.discover(Tsl2561, options);
      self.server.info('Discovered new device TSL2561');
    }
  });

  next();

};
