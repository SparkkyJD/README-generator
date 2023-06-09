const inquirer = require('inquirer');
const fs = require('fs');
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is the title of your project?',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Please provide a brief description of your project:',
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Please provide installation instructions for your project:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Please provide usage instructions for your project:',
  },
  {
    type: 'input',
    name: 'contribution',
    message: 'Please provide contribution guidelines for your project:',
  },
  {
    type: 'input',
    name: 'test',
    message: 'Please provide test instructions for your project:',
  },
  {
    type: 'checkbox',
    name: 'license',
    choices: ['MIT License', 'ISC License', 'Apache License 2.0', 'GNU GPLv3']
  },
  {
    type: 'checkbox',
    message: 'What would you like included in the table of contents?',
    name: 'contents',
    choices: ['Installation', 'Usage Instructions', 'Contribution Guidelines', 'Test Instructions', 'Questions', 'License Type']
  },
  {
    type: 'input',
    name: 'github',
    message: 'Please provide your GitHub Username:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Please provide your Email:',
  },
];
// init the prompt questions and user inputs.
inquirer.prompt(questions).then((answers) => {
  const markdown = generateMarkdown(answers);
  fs.writeFile('README.md', markdown, (err) => {
    if (err) {
      console.error(err);
      // console log when readme is added
    } else {
      console.log('README.md file created successfully!');
    }
  });
});
// generate readme.md file
function generateMarkdown(answers) {
  // to make the table of contents appear in a comumn
  const contents = answers.contents.map((item) => {
    return `- [${item}](#${item.toLowerCase().replace(/ /g, '-')})`;
  }).join('\n');
  // Adds a license badge
  let licenseBadge = "";
  if (answers.license.length > 0) {
    const licenseName = answers.license[0];
    licenseBadge = `![License: ${licenseName}](https://img.shields.io/badge/License-${licenseName.split(' ').join('%20')}-brightgreen.svg)\n\n`;
  }
  // append user inputs to readme file. added a tags so when table of content links are clicked, 
  // the page will take you directly to selected input.
  // made a link that will insert the github username to a href. 
  return `# ${answers.title}\n\n${licenseBadge}
## Description\n${answers.description}\n\n
## Table of Contents\n${contents}\n\n
## Installation <a name="installation"></a>\n${answers.installation}\n\n
## Usage Instructions <a name="usage"></a>\n${answers.usage}\n\n
## Contribution Guidelines <a name="contribution"></a>\n${answers.contribution}\n\n
## Test Instructions <a name="test"></a>\n${answers.test}\n
## Questions <a name="github"></a>\n Github Username: <a href="https://github.com/${answers.github}">${answers.github}</a>\n\nContact me via Email: ${answers.email}
## License type <a name="license"></a>\nThis application is covered under: ${answers.license}`;
}

