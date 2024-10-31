const si = require('systeminformation');

async function getSystemInformation() {
  try {
    const [cpu, system, mem, osInfo, currentLoad, processes, diskLayout, networkInterfaces] = await Promise.all([
      si.cpu(),
      si.system(),
      si.mem(),
      si.osInfo(),
      si.currentLoad(),
      si.processes(),
      si.diskLayout(),
      si.networkInterfaces(),
    ]);
    return { cpu, system, mem, os: osInfo, currentLoad, processes, diskLayout, networkInterfaces };
  } catch (err) {
    console.error('Error: ', err.message); // Only log the error message for clarity
    throw new Error('404'); // Ensure this message aligns with your test
  }
}

module.exports = getSystemInformation;
