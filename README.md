# CLG Frontend - Cover Letter Generator Frontend

## Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
  - [Next.js](#nextjs)
  - [Material UI](#material-ui)
  - [State Management](#state-management)
    - [React `useContext` Hook](#react-usecontext-hook)
    - [React `useReducer` Hook](#react-usereducer-hook)
  - [TypeScript](#typescript)
  - [Mantime UI](#mantime-ui)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

The `clg frontend` repository is dedicated to the frontend part of the Cover Letter Generator application. This README will walk you through the core technologies, architecture, and how to get started with development.

## Technologies

### Next.js

[Next.js](https://nextjs.org/) is an open-source React framework that enables features like server-side rendering and generating static websites for React-based web applications. It provides a robust set of features to build enterprise-level applications with optimized performance.

### TypeScript

The codebase is fully typed using [TypeScript](https://www.typescriptlang.org/). TypeScript is a superset of JavaScript that allows us to use static types. This ensures better maintainability, easier debugging, and a more expressive codebase.

### Material UI

The project utilizes [Material UI](https://mui.com/) as its component library. It is integrated with Emotion and Styled components for styling. Material UI offers a wide array of customizable and accessible UI components following Google's Material Design guidelines.

### State Management

The application adopts a simple yet efficient state management strategy using native React hooks: `useContext` and `useReducer`.

#### React `useContext` Hook

The `useContext` hook is used for passing data that can be considered “global” for a tree of React components. It's perfect for sharing functionalities and data components without the need to pass props through multiple layers.

#### React `useReducer` Hook

`useReducer` complements `useContext` by providing a more predictable state management flow. It's an alternative to `useState` and is beneficial when handling complex state logic in a component. 

### Mantime UI

For in-app text editing capabilities, the project employs Mantime UI, a subset of [Tiptap](https://tiptap.dev/). This offers a flexible and extensible text editor perfectly suited for modern web applications.

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/clg-frontend.git

# Navigate to the directory
cd clg-frontend

# Install dependencies
npm install

# Run the development server
npm run dev
