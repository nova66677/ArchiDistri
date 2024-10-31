const si = require('systeminformation');

async function getSystemInformation() {
  try {
    const cpu = await si.cpu();
    const system = await si.system();
    const mem = await si.mem();
    const os = await si.osInfo();
    const currentLoad = await si.currentLoad();
    const processes = await si.processes();
    const diskLayout = await si.diskLayout();
    const networkInterfaces = await si.networkInterfaces();

    const systemInformation = {
      cpu,
      system,
      mem,
      os,
      currentLoad,
      processes,
      diskLayout,
      networkInterfaces,
    };

    return systemInformation; 
  } catch (err) {
    console.error('404', err);
    throw new Error('404'); // Custom error message
  }
}

module.exports = getSystemInformation;
