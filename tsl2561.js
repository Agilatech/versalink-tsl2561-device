const VersalinkDevice = require(process.versalink.device);
const device = require('@agilatech/tsl2561');

module.exports = class Tsl2561 extends VersalinkDevice {
    
    constructor(config) {
        
        // The bus/file must be defined. If not supplied in config, then default to i2c-1
        const bus  = config['bus'] || "/dev/i2c-1";
        
        // Likewise, the address must be defined, so default to 0x39 if not present
        const addr  = config['addr'] || 0x39;
        
        const hardware = new device.Tsl2561(bus, addr);
        
        super(hardware, config);
        
    }
        
}

