/*
 Copyright © 2016 Agilatech. All Rights Reserved.
 
 Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 
 The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

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
