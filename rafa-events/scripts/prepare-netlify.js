const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const outputDirectory = path.join(root, 'dist');
const publicFiles = [
  'index.html',
  'apparels.html',
  'desserts.html',
  'assets/styles/header.css',
  'assets/styles/footer.css',
  'assets/styles/index.css',
  'assets/styles/apparels.css',
  'assets/styles/desserts.css',
  'assets/styles/public-mobile.css',
  'assets/js/header.js',
  'assets/js/public-mobile.js',
  'assets/js/siteContent.js',
  'assets/js/index.js',
  'assets/js/apparel.js',
  'assets/js/desserts.js',
  'assets/js/footer.js'
];
const nexoraFiles = ['index.html', 'dashboard.css', 'dashboard.js'];

function copyFiles(sourceDirectory, destinationDirectory, files) {
  for (const file of files) {
    const source = path.join(sourceDirectory, file);
    const destination = path.join(destinationDirectory, file);
    if (!fs.statSync(source).isFile()) {
      throw new Error(`Expected a file to publish: ${source}`);
    }
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.copyFileSync(source, destination);
  }
}

if (path.dirname(outputDirectory) !== root) {
  throw new Error('Netlify output directory must remain inside the project root.');
}

fs.rmSync(outputDirectory, { recursive: true, force: true });
copyFiles(path.join(root, 'frontend'), outputDirectory, publicFiles);
copyFiles(path.join(root, 'admin'), path.join(outputDirectory, 'admin'), nexoraFiles);
fs.writeFileSync(
  path.join(outputDirectory, '_redirects'),
  '/admin /admin/ 301\n/admin.html /admin/ 301\n',
  'utf8'
);

console.log('Prepared public site and Nexora admin in dist/.');
