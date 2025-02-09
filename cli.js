#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const inquirer = require('inquirer');

async function setupProject() {
  const questions = [
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'Install into current folder',
        'Create a new folder'
      ]
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter the name of your new project directory:',
      when: (answers) => answers.action === 'Create a new folder',
      validate: input => input ? true : 'Project directory name cannot be empty.'
    },
    {
      type: 'input',
      name: 'projectDisplayName',
      message: 'Enter the name of your project:',
      validate: input => input ? true : 'Project name cannot be empty.'
    }
  ];

  const answers = await inquirer.prompt(questions);
  const projectPath = answers.action === 'Create a new folder'
    ? path.resolve(process.cwd(), answers.projectName)
    : process.cwd();

  if (answers.action === 'Create a new folder') {
    if (fs.existsSync(projectPath)) {
      console.error(`The directory ${answers.projectName} already exists.`);
      process.exit(1);
    }
    fs.mkdirSync(projectPath);
    console.log(`Creating a new project in ${projectPath}.`);
  } else {
    console.log(`Installing in current directory ${projectPath}.`);
  }

  // Copy template files
  const templateDir = path.resolve(__dirname, 'template');
  if (!fs.existsSync(templateDir)) {
    console.error('Template directory does not exist.');
    process.exit(1);
  }

  fs.readdirSync(templateDir).forEach(file => {
    const src = path.join(templateDir, file);
    const dest = path.join(projectPath, file);
    fs.copyFileSync(src, dest);
  });

  // Update package.json with the project name
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  packageJson.name = answers.projectDisplayName;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit', cwd: projectPath });

  console.log('Project setup complete!');
  console.log(`You can now start your project by running:\n  cd ${projectPath}\n  npm start`);
}

setupProject(); 