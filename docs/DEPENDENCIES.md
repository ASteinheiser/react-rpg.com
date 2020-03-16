# Dependencies
Just a short file documenting why each dependency is required.

## The list from `package.json`

- [body-scroll-lock](https://www.npmjs.com/package/body-scroll-lock)

Self-explanatory title. Concerns itself with separating scrolling of body from a target element.

- [hammerjs](https://hammerjs.github.io/)

Used to detect mulit-touch -- useful for mobile deployment.

- lodash.clonedeep
- lodash.debounce

Both of the above can be traced back to [here](https://lodash.com/). I imagine they were used for a single feature implementation, 
so it's possible they could be refactored out.
- node-sass

Should be obvious why this is here.
- react

Should be obvious why this is here.
- react-device-detect

Title is self-explanatory. Allows us to discriminate between mobile and desktop when rendering.
- react-dom

- react-ga
- react-redux
- react-scripts

Should be obvious why this is here.
- react-sound
- react-timeout
- redux
- redux-persist
- redux-thunk

Various redux packages.
- typeface-montserrat
- typeface-roboto

Both of the above are simply fonts. They are likely to be removed depending on how 
