const getSystemInformation = require('../dist/sysInfo');
const si = require('systeminformation');
jest.mock('systeminformation');
describe('getSystemInformation', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should return system information', async () => {
        si.cpu.mockResolvedValue({
            manufacturer: 'AMD',
            brand: 'Ryzen 7 5800H with Radeon Graphics',
            speed: 3.22,
            cores: 16,
        });
        si.system.mockResolvedValue({
            manufacturer: 'LENOVO',
            model: '82K2',
        });
        si.mem.mockResolvedValue({
            total: 14504079360,
            free: 734601216,
        });
        si.osInfo.mockResolvedValue({
            platform: 'linux',
            distro: 'Kali GNU/Linux',
        });
        si.currentLoad.mockResolvedValue({
            avgLoad: 0.04,
            currentLoad: 1.69,
        });
        si.processes.mockResolvedValue({
            all: 365,
            running: 1,
        });
        si.diskLayout.mockResolvedValue([]);
        si.networkInterfaces.mockResolvedValue([]);
        const info = await getSystemInformation();
        expect(info).toEqual({
            cpu: {
                manufacturer: 'AMD',
                brand: 'Ryzen 7 5800H with Radeon Graphics',
                speed: 3.22,
                cores: 16,
            },
            system: {
                manufacturer: 'LENOVO',
                model: '82K2',
            },
            mem: {
                total: 14504079360,
                free: 734601216,
            },
            os: {
                platform: 'linux',
                distro: 'Kali GNU/Linux',
            },
            currentLoad: {
                avgLoad: 0.04,
                currentLoad: 1.69,
            },
            processes: {
                all: 365,
                running: 1,
            },
            diskLayout: [],
            networkInterfaces: [],
        });
    });
    it('Erreurs handler', async () => {
        si.cpu.mockRejectedValue(new Error('404'));
        await expect(getSystemInformation()).rejects.toThrow('404');
    });
});
//# sourceMappingURL=sysInfo.test.spec.js.map