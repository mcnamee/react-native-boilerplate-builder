# Understanding the File Structure

- `/docs` - Github Repo Documentation
- `/native-base-theme` - React Native's theme (by NativeBase)
- `/src` - Contains the source code for both web & native
    - `/components` - 'Dumb-components' / presentational. [Read More &rarr;](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)
    - `/constants` - Shared variables
    - `/containers` - 'Smart-components' that connect business logic to presentation [Read More &rarr;](https://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components)
    - `/images` - Images
    - `/lib` - Utils and custom libraries
    - `/models` - Rematch models combining actions, reducers and state. [Read More &rarr;](https://github.com/rematch/rematch#step-2-models)
    - `/routes`- Wire up the router with any & all screens [Read More &rarr;](https://github.com/aksonov/react-native-router-flux)
    - `/store`- Redux Store - hooks up the stores and provides initial/template states [Read More &rarr;](https://redux.js.org/docs/basics/Store.html)
