# Thesarus App

This is an opinionated setup that you can use to build a modern client/server application based on ExpressJS and ReactJS.  
Then you use Docker to release it and run on Amazon ECS or whatever else infrastructure you might like.

The business logic of the app implements a basic graph database that is used to create a
extremely simple synonyms database. Like the Thesarus.

Some REST api allows to populate and explore the graph while a UI based on ReactJS
serves as mobile interface to it.

## Quick Start

**IMPORTANT:** This setup is developed and maintained on a Mac.
The following instructions and the entire documentation are related to that platform only.

1. Install [docker & docker-compose](https://www.docker.com/)
2. Install [humble-cli](https://github.com/marcopeg/humble-cli)
3. Run: `humble boot --prod`
4. Visit: [`http://localhost:8080`](http://localhost:8080)
5. Run: `Ctrl + c` to detach the terminal from the Docker session
6. Run: `humble drop --prod` to stop the project

If you want to run the e2e test suite just type:

`humble test`

## API Documentation

### post://api/v1/graph

Inject entities into the graph and link them together.

request body:

```
{
  "entities" : [
	{ "id": "dog", "type": "word", "title": "Dog" },
	{ "id": "cane", "type": "word", "title": "Cane" }
  ]
}
```

response body:

```
{
    "data": [
        {
            "type": "link",
            "nodeId": 2,
            "entityId": "dog"
        },
        {
            "type": "link",
            "nodeId": 2,
            "entityId": "cane"
        }
    ]
}
```

### get://api/v1/graph

list all existing entities

```
{
    "data": [
        {
            "type": "word",
            "id": "cane",
            "attributes": {
                "id": "cane",
                "type": "word",
                "title": "Cane"
            }
        },
        {
            "type": "word",
            "id": "dog",
            "attributes": {
                "id": "dog",
                "type": "word",
                "title": "Dog"
            }
        }
    ]
}
```

### get://api/v1/graph/links/:entityId

get existing links for a specific entry

```
{
    "data": {
        "type": "word",
        "id": "cane",
        "attributes": {
            "id": "cane",
            "type": "word",
            "title": "Cane"
        },
        "relationships": {
            "synonyms": [
                {
                    "type": "word",
                    "id": "dog"
                }
            ]
        }
    },
    "included": [
        {
            "type": "word",
            "id": "dog",
            "attributes": {
                "id": "dog",
                "type": "word",
                "title": "Dog"
            }
        }
    ]
}
```

## Technology Stack

### Database

- Postgres

### Server

- Babel (ES6, import, spread operator)
- ESLint
- Flow Type
- ExpressJS
- PUG (template engine)

### Client

- Babel (ES6, import, spread operator)
- ESLint
- Flow Type
- React (15.x)
- React Redux
- Redux Saga
- React Router
- Stylus (CSS Preprocessor)
- Twitter Bootstrap (modular with Stylus)
- MetroUI
- CSS Modules (and also global)
- Async Module Loading (split routes into separated bundles)
- Live Reload (development)
- Source Maps (development)

### Testing

- Selenium
- WebdriverIO

## Software Dependencies

You only need Docker to run this project.  
All NodeJS magic is wrapped into containers for you

- [docker & docker-compose](https://www.docker.com/)
- [humble-cli](https://github.com/marcopeg/humble-cli)

## Project Quality Tools

### ESLint

### FlowJS

### React PropTypes

### E2E Tests

The only way to really assess if a software really works is to execute it in
an environment as close as possible to production.

This project uses Docker, Selenium and WebdriverIO to run a production distribution
of the service with a volatile database that get destroyed at every run so to
guarantee that there are no uncoded prerequisites to the execution of the tests.

Run: `humble test --build` to force a full production build and run the tests
in an isolated sandbox.

## Humble CLI - Utility Scripts

> HumbleCLI facilitates your Docker job with utility scripts that can access the
environment context.

You run each script as `humble {script-name}` where `{script-name}` is the
name of the script you want to execute from the `/scripts` folder.

Here are a couple of examples

### boot

Spins up the project as it is configured in the `.env` file:

```
humble boot
```

You can also start a specific service:

```
humbe boot {service-name}
```

### ssh

Use this script to get bash control of a specific running service:

```
humble ssh server
> yarn add foo-library
> exit
```

You may need this to add `NPM` dependencies to the project.

### get-version

```
humble get-version
> 0.0.3
```

### bump-version

Use this script to variate the `package.json` version in both client and server projects.

```
humble bump-version 1.0.34
```

## Code Style // ESLint

We ship an opinionated extension of Airbnb's ESLint preset which basically achieves a mix between ESLint and Standard. Why? Because we like it!

```
humble ssh server
$> yarn lint

humble ssh client
$> yarn lint
```
## Type Check // Flow

```
humble ssh server
$> yarn flow

humble ssh client
$> yarn flow
```
---



# Editor Setup

## Atom

I suggest you install the following plugins:

- Nuclide
- language-babel
- language-pug
- language-stylus
- linter
- linter-ui-default
- linter-eslint

---



# Working the Client

## CSS Support

The setup support [Stylus](http://stylus-lang.com/) because we think it's cool
and it offers both global CSS and [CSS modules](https://github.com/css-modules/css-modules):

```
/* Import a global CSS */
import './my-css.global.styl'

/* Import a CSS module */
import styles from './my-css.module.styl'
```

If you want to include a file that is not suffixed with `global` or `module`
you need to explicitly define the loaders you want to apply at require time:

```
import '!style-loader!css-loader!stylus-loader!./styles/index.styl'
import '!style-loader!css-loader!./styles/index.css'
```

### Twitter Bootstrap

This project is configured with `bootstrap-styl` project so you can import
boostrap' stuff just like this:

```
@import "boostrap"
```

Take a look into `styles/index.global.styl` for a live example.

### Autoprefixer

[to be completed]


### Rucksack CSS

[to be completed]

### Fonts

Webpack is set so to load the following fonts:

- svg
- woff
- woff2
- ttf
- ottf
- eot

During development they are all embedded in the js bundle but in production
you can set a treshold for this behaviour. You can change this in:

 `services/frontend/client/webpack/config.js~15`

### Extract CSS

When you build the production image all the CSS are exported into a separate file which is then loaded independetly from the js bundle.

This cool thing will avoid any initial loading blinking.

### CSS SourceMaps

[to be completed]

## Images and SVGs

You can import SVGs as React components from:

- src/assets/images/*.svg
- src/components/*.svg
- src/containers/*.svg
- src/routes/*.svg
- src/layouts/*.svg

Same concept applies to images.

Images below 5kb will be **inlined in the js bundle** for faster loading time. You can change this setting in:

 `services/frontend/client/webpack/config.js~23`

Images above the set limit will be optimized and exported to a `/dist/images` folder.

## MetroUI

[to be completed]

## React Redux & Redux Saga

`src/store.js`

## React Router

`src/history.js`

### Sub Routing

Sub routing gave me the headache. It is not straightforward (to me) how to dispatch redux events from routes and sub-routes without getting into some messy class based definition components.

I ended up by listening to the `@@router/LOCATION_CHANGE` event and matching it inside a saga.

An example is available in `routes/Gallery`.

### Styleguide

The _styleguide_ app is up and running at `http://localhost:4000` and shows fully hot-reload enabled pages with relevant informations about how to use the App's components with different params.

> The _styleguide_ is a **living visual documentation** of your application.

You can add a `ComponentName.styleguide.jsx` file to your components to write new pages in the _styleguide_ app.

```
import React from 'react'

// Import the component you want to show
import MyComponet from './MyComponent

// Use the component in different configurations:
const MyComponentStyleguide = () => (
  <div className={'styleguide-module'}>
    <div className={'styleguide-section'}>
      <h3>{'MyComponet Styleguide:'}</h3>
      <MyComponet />
    </div>
  </div>
)

export default MyComponentStyleguide
```
---





# Working With The Server

The entire serve source code is wrapped up with `babel` so it is possible to use the latest JS syntax available.

The entry point of the server application is:

`services/frontend/server/src/main.js`

### Folder Structure

### Environment Configuration

### ExpressJS

---




# Troubleshooting

### node_modules conflicts

It may happen that you `humble boot` the project and something go wrong due to the dependencies install process.

Just reboot (`humble boot`, not your mac!)

### Building the Client

Sometimes the building script fails on OSX due to `libpng` incompatibility.
I managed to solve it by reinstalling it:

```
brew install libpng
```

### Webpack Resolve Aliases VS Flow

I had big times figuring out how to implement the alias feature in the project
and still keep Flow running... luckily I found this:

https://github.com/cdebotton/react-universal/blob/master/.flowconfig

Aliases conflicts also with ESLint, we use `eslint-plugin-import` with
`eslint-import-resolver-webpack` to fix it.

---



# HowTo...

## How to start a single service?

Say you want to work on the server without the client or on the client without the server being running:

```
humble boot ${service-name}
```

## How to run the client app from Node?

You may want to skip Docker if you work only on the client and you feel Docker is slowing down your Mac a bit. This is totally possible.

#### 1. Node version

The client uses node version `9.2.x`, I saw the client running with `6.4.x` but I strongly suggest you update to the latest available node.

You may want to consider installing node via [NVM](https://github.com/creationix/nvm).

If you have an older version of node running consider a [full cleanup](https://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x) and then install it over via NVM.

#### 2. Yarn

We are using Yarn instead of NPM. It feels more reliable and a little faster.  
[install yarn](https://yarnpkg.com/en/docs/install)

#### 3. Client Root

Move into `/services/frontend/client`, I will refer to this folder as the **client root**.

#### 4. Install dependencies

**NOTE:** It is important to remove any dependency you may have installed through `Docker`.

```
rm -rf node_modules
yarn install
```

#### 5. Start scripts

```
# Run development setup
yarn start

# Run styleguide
yarn start:styleguide

# Run production build
yarn serve

# Run quality checks
yarn flow
yarn lint
```
