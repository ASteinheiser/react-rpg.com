# Dependencies
Just a short file documenting why each dependency is required.

## The list from `package.json`

- [body-scroll-lock](https://www.npmjs.com/package/body-scroll-lock)

Self-explanatory title. Concerns itself with separating scrolling of body from a target element.

- [hammerjs](https://hammerjs.github.io/)

Used to detect multi-touch -- useful for mobile deployment.

- lodash.clonedeep
- lodash.debounce

Both of the above can be traced back to [here](https://lodash.com/). I imagine they were used for a single feature implementation, 
so it's possible they could be refactored out.

- [node-sass](https://github.com/sass/node-sass)

Should be obvious why this is here.

- [react](https://reactjs.org/)

Should be obvious why this is here.

- [react-device-detect](https://www.npmjs.com/package/react-device-detect)

Title is self-explanatory. Allows us to discriminate between mobile and desktop when rendering.

- [react-dom](https://reactjs.org/docs/react-dom.html)

Provides DOM-specific methods.

- [react-ga](https://github.com/react-ga/react-ga)

For tracking with Google Analytics.

- [react-redux](https://react-redux.js.org/)

React bindings for Redux.

- [react-scripts](https://www.npmjs.com/package/react-scripts)

Should be obvious why this is here.

- [react-sound](https://www.npmjs.com/package/react-sound)

Self-explanatory title.

- [react-timeout](https://www.npmjs.com/package/react-timeout)

Self-explanatory title.

- [redux](https://redux.js.org/)

Should be obvious why this is here.

- [redux-persist](https://github.com/rt2zz/redux-persist)

For persisting react stores.

- [redux-thunk](https://github.com/reduxjs/redux-thunk)

Middleware for Redux.

- [typeface-montserrat](https://www.npmjs.com/package/typeface-montserrat)
- [typeface-roboto](https://www.npmjs.com/package/typeface-roboto)

Both of the above are simply fonts. They are likely to be removed depending on how we decided to redesign the game.

## Dependencies to be removed

`react-ga`
`hammerjs`
`lodash`
`typeface-montserrat`
`typeface-robot`