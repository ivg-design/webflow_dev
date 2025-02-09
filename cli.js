#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const projectName = process.argv[2];

if (!projectName) {
  console.error('Please specify the project directory:');
  console.error('  npx webflow-dev-repo <project-directory>');
  process.exit(1);
}

const projectPath = path.resolve(process.cwd(), projectName);

if (fs.existsSync(projectPath)) {
  console.error(`The directory ${projectName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(projectPath);
console.log(`Creating a new project in ${projectPath}.`);

// Copy template files
const templateDir = path.resolve(__dirname, 'template');
fs.readdirSync(templateDir).forEach(file => {
  const src = path.join(templateDir, file);
  const dest = path.join(projectPath, file);
  fs.copyFileSync(src, dest);
});

console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit', cwd: projectPath });

console.log('Project setup complete!');
console.log(`You can now start your project by running:\n  cd ${projectName}\n  npm start`); 