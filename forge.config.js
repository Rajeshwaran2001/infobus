const { GithubPublisher } = require('@electron-forge/publisher-github');
const path = require('path');

const packageJson = require('./package.json');

const { version } = packageJson;
const iconDir = path.resolve(__dirname, 'assets', 'icons');

module.exports = {
  packagerConfig: {
    name: 'InfoBus',
    executableName: 'InfoBus',
    asar: false,
    icon: path.resolve(__dirname, 'assets', 'icons', 'logo'),
    appBundleId: 'me.infobus.rajeshwaran',
  },
  rebuildConfig: {},
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Rajeshwaran2001',
          name: 'infobus',
        },
        prerelease: false,
        draft: true,
      },
    },
  ],
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: (arch) => ({
        name: 'InfoBus',
        authors: 'Rajeshwaran',
        exe: 'InfoBus.exe',
        iconUrl:
          'https://raw.githubusercontent.com/electron/fiddle/0119f0ce697f5ff7dec4fe51f17620c78cfd488b/assets/icons/fiddle.ico',
        loadingGif: './assets/loading.gif',
        noMsi: true,
        setupExe: `InfoBus-${version}-win32-${arch}-setup.exe`,
        setupIcon: path.resolve(iconDir, 'fiddle.ico'),
        certificateFile: process.env['WINDOWS_CODESIGN_FILE'],
        certificatePassword: process.env['WINDOWS_CODESIGN_PASSWORD'],
      }),
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
};
