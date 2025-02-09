#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const inquirer = require('inquirer');

async function setupProject() {
  const questions = [
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the name of your project directory:',
      validate: input => input ? true : 'Project directory name cannot be empty.'
    },
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Create a new folder',
        'Install into existing folder'
      ]
    }
  ];

  const answers = await inquirer.prompt(questions);
  const projectName = answers.projectName;
  const projectPath = path.resolve(process.cwd(), projectName);

  if (answers.action === 'Create a new folder') {
    if (fs.existsSync(projectPath)) {
      console.error(`The directory ${projectName} already exists.`);
      process.exit(1);
    }
    fs.mkdirSync(projectPath);
    console.log(`Creating a new project in ${projectPath}.`);
  } else {
    if (!fs.existsSync(projectPath)) {
      console.error(`The directory ${projectName} does not exist.`);
      process.exit(1);
    }
    console.log(`Installing in existing directory ${projectPath}.`);
  }

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
}

setupProject(); 