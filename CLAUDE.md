# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Kajero is an interactive JavaScript notebook platform that allows users to create executable Markdown documents with embedded JavaScript code blocks, data visualization capabilities, and automatic data fetching. It's built as a single-page React application with Redux state management.

## Development Commands

### Build Commands
- `gulp` - Default build task: compiles SCSS and bundles JavaScript using Browserify/Babel
- `NODE_ENV=production gulp` - Production build with minification and optimization
- `gulp sass` - Compile SCSS files to CSS
- `gulp bundle` - Bundle JavaScript files with Browserify

### Testing Commands
- `npm test` - Run unit tests with Mocha (ES6 transpilation via Babel)
- `npm run test-cov` - Run tests with coverage reporting (90% line coverage threshold)
- `gulp test-cov` - Alternative coverage command via Gulp

### CLI Tool Usage
The project includes a global CLI tool accessible via `kajero` command:
- `kajero html [file.md]` - Generate HTML from Markdown notebook
- `kajero publish [file.md]` - Publish notebook as GitHub Gist and get unique URL

## Architecture

### Frontend Stack
- **React 0.14.x** with Redux for state management
- **Browserify + Babel** for ES6/JSX transpilation and bundling
- **SCSS** for styling with Gulp compilation
- **Immutable.js** for state management
- **CodeMirror** for in-browser code editing

### Key Libraries
- **Jutsu** - Simple graphing library for data visualization
- **Reshaper** - Automatic data reshaping utilities  
- **Smolder** - Library wrapper for data transformation
- **D3/NVD3** - Advanced charting capabilities
- **markdown-it** - Markdown parsing
- **highlight.js** - Syntax highlighting

### Project Structure
```
src/
├── js/
│   ├── app.js              # React app entry point
│   ├── Notebook.js         # Main notebook container component
│   ├── actions.js          # Redux action creators
│   ├── components/         # React UI components
│   │   ├── CodeBlock.js    # Executable code block component
│   │   ├── TextBlock.js    # Markdown text block component
│   │   └── visualiser/     # Data visualization components
│   ├── reducers/           # Redux reducers
│   └── config/             # Environment-specific configs
├── scss/                   # Sass stylesheets
└── dist/                   # Built assets (bundle.js, main.css)
```

### State Management
Uses Redux with three main reducers:
- **notebookReducer** - Notebook content, metadata, data sources
- **editorReducer** - UI state, active blocks, edit mode
- **executionReducer** - Code execution results and status

### Data Flow
1. Notebook loads from Markdown embedded in HTML via `loadMarkdown()` action
2. Data sources are automatically fetched via `fetchData()` action  
3. Code blocks execute in browser context with access to fetched data
4. Results are visualized using custom visualiser components
5. Notebooks can be saved as HTML or published as GitHub Gists

## Development Notes

- The build process uses Watchify for incremental rebuilds during development
- Tests use Mocha with jsdom for DOM simulation and Sinon for mocking
- Code coverage excludes external libraries (jutsu, reshaper, smolder)
- Browser-sync provides live reloading during development
- Production builds include uglification and environment variable replacement