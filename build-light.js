const fs = require('fs');
const path = require('path');

// Read the original config
const configPath = './docusaurus.config.ts';
let configContent = fs.readFileSync(configPath, 'utf8');

// Create a temporary light version for build
const lightConfig = configContent
  // Comment out heavy features during build
  .replace(/(import.*prismThemes.*\n)/, '// $1')
  .replace(/(prism: {[^}]+},?\n?)/g, '  // $1\n')
  .replace(/(markdown: {[^}]+},?\n?)/g, '  // $1\n');

// Write temporary config
fs.writeFileSync('./docusaurus.config.light.ts', lightConfig);

// Run the build with light config
const { spawn } = require('child_process');

const buildProcess = spawn('npx', ['docusaurus', 'build'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=4096 --optimize_for_size --gc_interval=100'
  }
});

buildProcess.on('close', (code) => {
  // Restore original config
  fs.writeFileSync(configPath, configContent);
  console.log(`Build finished with code ${code}`);
  process.exit(code);
});