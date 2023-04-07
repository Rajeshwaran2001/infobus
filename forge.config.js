const { GithubPublisher } = require('@electron-forge/publisher-github');
const path = require('path');

const packageJson = require('./package.json');

const { version } = packageJson;
const iconDir = path.resolve(__dirname, 'assets', 'icons');

const commonLinuxConfig = {
  icon: {
    scalable: path.resolve(iconDir, 'logo.svg'),
  },
  mimeType: ['x-scheme-handler/infobus'],
};
module.exports = {
  packagerConfig: {
    name: 'infobus',
    executableName: 'infobus',
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
          'https://raw.githubusercontent.com/Rajeshwaran2001/infobus/main/assets/icons/logo.ico',
        loadingGif: './assets/loading.gif',
        noMsi: true,
        setupExe: `InfoBus-${version}-win-${arch}-setup.exe`,
        setupIcon: path.resolve(iconDir, 'logo.ico'),
      }),
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    }
  ],
};