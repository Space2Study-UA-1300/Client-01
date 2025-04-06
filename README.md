<a href="https://softserve.academy/"><img src="../main/photo2.jpg" title="SoftServe IT Academy" alt="SoftServe IT Academy"></a>

# SpaceToStudy project

SpaceToStudy project is a platform where experts in various fields share their knowledge and students can learn from the best. Here you can find the proper training course, find a tutor, or find students and receive feedback from them.

[![GitHub issues](insert your link here)]
[![Pending Pull-Requests](insert your link here)]
[![GitHub license](insert your link here)]

---

- [Installation](#installation)
  - [Required to install](#Required-to-install)
  - [Clone](#Clone)
  - [Setup](#Setup)
  - [How to run local](#How-to-run-local)
- [Usage](#Usage)
  - [How to run tests](#How-to-run-tests)
- [Project Structure](#project-structure)
- [Documentation](#Documentation)
  - [Rules and guidelines](#Rules-and-guidelines)
  - [Testing](#Testing)
- [Contributing](#contributing)
  - [Git flow](#git-flow)
  - [Issue flow](#issue-flow)
- [FAQ](#faq)
- [License](#license)

---

## Installation

### Required to install

- NodeJS (18.14.0 LTS)

### Clone

- Clone this repo to your local machine

### Setup

> install npm packages

```shell
$ npm install
```

### How to run local

1. Open terminal.
2. Run `npm run start` to start application.<sup>[*](#footnote)</sup>
3. Open http://localhost:3000 to view it in the browser.

###### <a name="footnote">*</a> - to run the project you need an `.env` file in root folder

---

## Usage

### How to run tests

To run unit test open terminal and run `npm run test` in it.

---

## Project Structure

```
│-- src/
│   │-- assets/            # Images, fonts, icons
│   │-- components/        # Reusable UI components
│   │-- constants/         # Global constants
│   │-- containers/        # Connected components
│   │-- context/           # React Contexts
│   │-- hooks/             # Custom React hooks
│   │-- pages/             # Page components
│   │-- plugins/           # External plugins integrations
│   │-- redux/             # Redux store, actions, reducers
│   │-- router/            # Routing configuration
│   │-- services/          # API and business logic
│   │-- styles/            # Global and component styles
│   │-- tests/             # Test files
│   │-- types/             # TypeScript types
│   │-- utils/             # Utility functions
│   │-- App.tsx            # Main app component
│   │-- index.tsx          # Entry point
│   │-- vite-env.d.ts      # Environment types
```

---

## Documentation

### Rules and guidelines

- Redux
  - Each entity should have a separate folder
  - Different files for actions, reducers (`{modelName}.actions.js` or `{modelName}.reducer.js`)
- Configuration
  - Configuration is done via `.env` file
- Styles
  - `makeStyles` from `@material-ui` should be used
- Components
  - Components connected to Redux should be in `containers`
  - Other components should be in `components`
  - Pages should be in `pages`
  - Each component should have:
    - `index.js` (exports everything)
    - `{component-name}.jsx` (component implementation)
    - `{component-name}.styles.js` (styles)

### Testing

#### Components

- Stateless components first
- Redux-connected components last
- Do not test:
  - Third-party libraries
  - Static styles
- Use snapshots and logic tests

#### Reducers

- Test default state
- State changes on actions

#### Cypress

- Use `data-cy` selectors

---

## Contributing

### Git flow

- `main`, `develop`, and `feature` branches
- All features must merge into `develop`
- Releases merge into `main`

### Issue flow

- Create issues for tasks
- Assign issue, label, and link tasks
- Track progress on the dashboard

---

## FAQ

- **How do I contribute?**
  - Open an issue and follow contribution guidelines.

---

## License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2023 © <a href="https://softserve.academy/" target="_blank"> SoftServe IT Academy</a>.

[MIT](https://choosealicense.com/licenses/mit/)

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

