const { GithubPublisher } = require('@electron-forge/publisher-github');
const path = require('path');

const packageJson = require('./package.json');

const { version } = packageJson;
const iconDir = path.resolve(__dirname, 'assets', 'icons');

const commonLinuxConfig = {
  icon: {
    scalable: path.resolve(iconDir, 'logo.svg'),
  },
  mimeType: ['x-scheme-handler/InfoBus'],
};
module.exports = {
  packagerConfig: {
    name: 'InfoBus',
    executableName: 'InfoBus',
    asar: true,
    icon: path.resolve(__dirname, 'assets', 'icons', 'logo'),
    appBundleId: 'me.InfoBus.rajeshwaran',
  },
  rebuildConfig: {},
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Rajeshwaran2001',
          name: 'InfoBus',
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
      name: "@electron-forge/maker-dmg",
      config: {
        name: `InfoBus-v${version}-mac-${process.platform}`,
        title: "InfoBus",
        version: "${version}",
        platform: "${platform}",
        icon: path.resolve(__dirname, "assets", "icons", "logo.icns"),
        background: path.resolve(__dirname, "assets", "background.jpg"),
        format: "ULFO",
        overwrite: true,
      },
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