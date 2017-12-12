const config = require('./config');

const Scout = require('zetta-scout');
const Tsl2561 = require('./tsl2561');

module.exports = class DeviceModelnameScout extends Scout {

  constructor(opts) {

    super();

    if (typeof opts !== 'undefined') {
      // copy all config options defined in the server
      for (const key in opts) {
        if (typeof opts[key] !== 'undefined') {
          config[key] = opts[key];
        }
      }
    }

    if (config.name === undefined) { config.name = "TSL2561" }
    this.name = config.name;

    this.tsl2561 = new DeviceModelname(config);

  }

  init(next) {
    const query = this.server.where({name: this.name});
  
    const self = this;

    this.server.find(query, function(err, results) {
      if (!err) {
        if (results[0]) {
          self.provision(results[0], self.tsl2561);
          self.server.info('Provisioned known device ' + self.name);
        } else {
          self.discover(self.tsl2561);
          self.server.info('Discovered new device ' + self.name);
        }
      }
      else {
        self.server.error(err);
      }
    });

    next();
  }

}
