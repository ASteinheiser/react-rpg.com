# How to Contribute
## 1. [Create an Issue](https://github.com/ASteinheiser/react-rpg.com/issues/new) that describes the feature or bug
## 2. Let's discuss to make sure that we are moving the project in the right direction
## 3. Install
```
git clone https://github.com/ASteinheiser/react-rpg.com
cd react-rpg.com
nvm use
yarn install
```
## 4. Develop Locally
```
yarn start
```
## 5. Run Tests
```
yarn test
```
## 6. Submit a Pull Request to STAGING

Your pull request will be reviewed. If merged in, your changes will be automatically deployed (via AWS CodePipeline) to the beta url ([staging.react-rpg.com](http://staging.react-rpg.com)), so everyone can test your changes. After some testing, it will be merged to MASTER, which will deploy to the live site and mobile apps instantly (via WebView).