# React RPG

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-9-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

React RPG is an open-source RPG made with React and Redux. Experience the 2D turn-based, dungeon crawler that comes with two game modes: Story and Endless. Story mode will lead you through a short story while introducing you to the most powerful creatures. In Endless mode, a unique challenge waits around every corner, as no two maps are the same.

Play now at [react-rpg.com](https://react-rpg.com)!

There is a [React Native webview wrapper](https://github.com/ASteinheiser/ReactRPGNative) for React RPG, however it's no longer available via Google Play or App Store. If you would like to download React RPG for your mobile device, I recommend downloading the Progressive Web App ([PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Installing)).

## Now introducing React RPG: 2e

This expansion aims to enhance the systems already present in the base game by modifying and adding elements to lightly emulate the popular tabletop role-playing game _Dungeons and Dragons: 5th Edition_. In doing so, the following features are planned to be added:

| Definitely                                        | Hopefully                                      | Maybe                                    |
| ------------------------------------------------- | ---------------------------------------------- | ---------------------------------------- |
| ![check][checkmark] DnD Ability Scores for Player | ![check][checkmark] UI/UX Improvements         | ![cross][cross] Particle Effects         |
| ![check][checkmark] DnD Classes and Races         | ![cross][checkmark] Tutorial                   | ![cross][cross] Class-specific Abilities |
| ![check][checkmark] Dice-based Combat             | ![check][checkmark] Save/Load System           | ![cross][cross] Party System             |
| ![check][checkmark] New Maps/Levels               | ![check][checkmark] New Enemies                | ![cross][cross] Additional Game Modes    |
| ![check][checkmark] Character Creation            | ![check][checkmark] Customisable Outfit Colour |                                          |
| ![check][checkmark] Additional Items in Shop      | ![check][checkmark] Diversity in Enemy Attacks |                                          |
| ![check][checkmark] Spellcasting System           |                                                |                                          |

> Classes include Fighter, Ranger and Wizard

> Races include Human, Elf and Dwarf

## Developer Instructions

The game is hosted via GitHub pages at https://matteas.nz/roll-for-reaction, but for development purposes it is a requirement to be able to run the game locally.

#### Requirements

In order to run _Roll for Reaction_ locally, you must ensure you have setup, installed and tested:

-   `git`
-   `yarn`

This implementation is fully supported and tested on Arch Linux and Windows 10.

#### Install & Setup

1. Clone the repo

    `git clone https://github.com/Matteas-Eden/roll-for-reaction`

2. Change to the directory containing the repository

    `cd roll-for-reaction`

3. Install the dependencies

    `yarn install --frozen-lockfile`

4. Start the game locally

    `yarn start`

## Contributors

Thanks goes to all of these wonderful people who helped in making this project a success. For more information on the types of contributions, [see this page](../../wiki/Contributions).

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="20%"><a href="http://iamandrew.io"><img src="https://avatars1.githubusercontent.com/u/9949512?v=4?s=100" width="100px;" alt="Andrew Steinheiser"/><br /><sub><b>Andrew Steinheiser</b></sub></a><br /><a href="#ideas-ASteinheiser" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-ASteinheiser" title="Answering Questions">💬</a> <a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=ASteinheiser" title="Tests">⚠️</a> <a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=ASteinheiser" title="Code">💻</a> <a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=ASteinheiser" title="Documentation">📖</a> <a href="#maintenance-ASteinheiser" title="Maintenance">🚧</a> <a href="#tool-ASteinheiser" title="Tools">🔧</a> <a href="https://github.com/ASteinheiser/react-rpg.com/pulls?q=is%3Apr+reviewed-by%3AASteinheiser" title="Reviewed Pull Requests">👀</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/Alphanumber"><img src="https://avatars0.githubusercontent.com/u/9552208?v=4?s=100" width="100px;" alt="Alphanumber"/><br /><sub><b>Alphanumber</b></sub></a><br /><a href="#ideas-Alphanumber" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="20%"><a href="http://www.alaric.us"><img src="https://avatars1.githubusercontent.com/u/15240432?v=4?s=100" width="100px;" alt="Alaric von Teplitz"/><br /><sub><b>Alaric von Teplitz</b></sub></a><br /><a href="#question-Alaricus" title="Answering Questions">💬</a> <a href="#ideas-Alaricus" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ASteinheiser/react-rpg.com/pulls?q=is%3Apr+reviewed-by%3AAlaricus" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=Alaricus" title="Code">💻</a> <a href="https://github.com/ASteinheiser/react-rpg.com/issues?q=author%3AAlaricus" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/Saintroi"><img src="https://avatars2.githubusercontent.com/u/13038366?v=4?s=100" width="100px;" alt="Drew Nelson"/><br /><sub><b>Drew Nelson</b></sub></a><br /><a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=Saintroi" title="Tests">⚠️</a> <a href="https://github.com/ASteinheiser/react-rpg.com/issues?q=author%3ASaintroi" title="Bug reports">🐛</a> <a href="#ideas-Saintroi" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="20%"><a href="https://twitter.com/ajrussellaudio"><img src="https://avatars3.githubusercontent.com/u/1347511?v=4?s=100" width="100px;" alt="Alan Russell"/><br /><sub><b>Alan Russell</b></sub></a><br /><a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=ajrussellaudio" title="Code">💻</a> <a href="https://github.com/ASteinheiser/react-rpg.com/issues?q=author%3Aajrussellaudio" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="20%"><a href="http://matteas.nz"><img src="https://avatars0.githubusercontent.com/u/45587386?v=4?s=100" width="100px;" alt="Matt Eden"/><br /><sub><b>Matt Eden</b></sub></a><br /><a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=Matteas-Eden" title="Code">💻</a> <a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=Matteas-Eden" title="Documentation">📖</a> <a href="#ideas-Matteas-Eden" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ASteinheiser/react-rpg.com/pulls?q=is%3Apr+reviewed-by%3AMatteas-Eden" title="Reviewed Pull Requests">👀</a> <a href="#maintenance-Matteas-Eden" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/Pyxxil"><img src="https://avatars1.githubusercontent.com/u/12526499?v=4?s=100" width="100px;" alt="Josh Hill"/><br /><sub><b>Josh Hill</b></sub></a><br /><a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=Pyxxil" title="Code">💻</a> <a href="#ideas-Pyxxil" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ASteinheiser/react-rpg.com/pulls?q=is%3Apr+reviewed-by%3APyxxil" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=Pyxxil" title="Documentation">📖</a> <a href="#maintenance-Pyxxil" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/Frosty273"><img src="https://avatars0.githubusercontent.com/u/39424472?v=4?s=100" width="100px;" alt="Kelvin"/><br /><sub><b>Kelvin</b></sub></a><br /><a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=Frosty273" title="Code">💻</a> <a href="#ideas-Frosty273" title="Ideas, Planning, & Feedback">🤔</a> <a href="#design-Frosty273" title="Design">🎨</a> <a href="https://github.com/ASteinheiser/react-rpg.com/pulls?q=is%3Apr+reviewed-by%3AFrosty273" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=Frosty273" title="Documentation">📖</a> <a href="#maintenance-Frosty273" title="Maintenance">🚧</a></td>
      <td align="center" valign="top" width="20%"><a href="https://github.com/KimberleyEvans-Parker"><img src="https://avatars2.githubusercontent.com/u/45865186?v=4?s=100" width="100px;" alt="Kimberley"/><br /><sub><b>Kimberley</b></sub></a><br /><a href="#design-KimberleyEvans-Parker" title="Design">🎨</a> <a href="#ideas-KimberleyEvans-Parker" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=KimberleyEvans-Parker" title="Documentation">📖</a> <a href="https://github.com/ASteinheiser/react-rpg.com/pulls?q=is%3Apr+reviewed-by%3AKimberleyEvans-Parker" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/ASteinheiser/react-rpg.com/commits?author=KimberleyEvans-Parker" title="Code">💻</a> <a href="#maintenance-KimberleyEvans-Parker" title="Maintenance">🚧</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

[checkmark]: https://api.iconify.design/octicon:check.svg?color=green 'check'
[cross]: https://api.iconify.design/octicon:x.svg?color=red&height=16 'cross'
