const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const dayNumber = process.argv.pop();

const getPathRelativeToBase = (relativePath) => {
  return path.resolve(__dirname, '..', relativePath);
}

const updatePlaceholder = (path) => {
  const fileContent = fs.readFileSync(path).toString();
  fs.writeFileSync(path, fileContent.replace('{x}', dayNumber));
};

fs.cpSync(getPathRelativeToBase('templates/day-x'), getPathRelativeToBase(`packages/day-${dayNumber}`), { recursive: true });

// Update package.json
updatePlaceholder(getPathRelativeToBase(`packages/day-${dayNumber}/package.json`));
updatePlaceholder(getPathRelativeToBase(`packages/day-${dayNumber}/test.ts`));

// Update parent project
childProcess.execSync('npm i', { cwd: getPathRelativeToBase('.') });
