# Webflow Dev Repo

This is a template for local Webflow development using Parcel. It provides a basic setup to get started with Webflow projects, including hot module replacement for a smooth development experience.

## Features

- **Parcel Bundler**: Fast and zero-config web application bundler.
- **Hot Module Replacement**: Automatically updates modules in the browser without a full page reload.
- **Easy Setup**: Clone the repository and start developing immediately.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ivg-design/webflow_dev.git
   cd webflow_dev
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

- **Start Development Server**: 

  ```bash
  npm start
  ```

  This will start the Parcel development server with hot reloading.

- **Build for Production**:

  ```bash
  npm run build
  ```

  This will create a production-ready build in the `dist` directory.

## Contributing

Feel free to open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.

## Using the Template

To create a new project using this template, follow these steps:

1. **Run the CLI Tool**:

   Use the following command to start the interactive setup:

   ```bash
   npx webflow-dev-repo
   ```

2. **Interactive Setup**:

   - **Choose an Option**:
     - **Install into Current Folder**: If you choose this option, the tool will install the template into the current directory.
     - **Create a New Folder**: If you choose this option, you will be prompted to enter the name of the new directory, and the tool will create it and set up the project there.

3. **Start Developing**:

   ```bash
   cd <project-directory>
   npm start
   ```

   This will start the development server with hot reloading.

4. **Build for Production**:

   ```bash
   npm run build
   ```

   This will create a production-ready build in the `dist` directory. 