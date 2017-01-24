
const VersalinkDevice = require('@agilatech/versalink-device');
const device = require('@agilatech/tsl2561');

module.exports = class Tsl2561 extends VersalinkDevice {
    
    constructor(options) {
        
        // The bus/file must be defined. If not supplied in options, then default to i2c-1
        const bus  = options['bus'] || "/dev/i2c-1";
        
        // Likewise, the address must be defined, so default to 0x39 if not present
        const addr  = options['addr'] || 0x39;
        
        const hardware = new device.Tsl2561(bus, addr);
        
        super(hardware, options);
        
    }
        
}

