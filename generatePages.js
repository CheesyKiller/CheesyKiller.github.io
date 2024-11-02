const fs = require('fs');
const path = require('path');

// Path to the projects JSON file
const projectsPath = path.join(__dirname, 'projects.json');

// Output directory for generated HTML files
const outputDir = path.join(__dirname, 'generated-pages');

// Remove all files in the output directory if it exists, then recreate it
if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir);

// Read projects.json and parse its content
fs.readFile(projectsPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading projects.json:', err);
        return;
    }

    const projects = JSON.parse(data).projects;

    projects.forEach(project => {
        const htmlContent = generateHTML(project);
        const outputPath = path.join(outputDir, `${project.title}.html`);

        fs.writeFile(outputPath, htmlContent, (err) => {
            if (err) {
                console.error(`Error writing file ${project.title}.html:`, err);
            } else {
                console.log(`Generated ${project.title}.html`);
            }
        });
    });
});

// Function to generate HTML content for a project
function generateHTML(project) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.title}</title>
    <link href='https://fonts.googleapis.com/css?family=Lato:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="../main-style.css">
</head>
<body>
    <h1 class="nav-parent-element">
        <div><h1 class="navAlign" style="white-space: nowrap; margin-top: -10px;">Vincent Hsu</h1></div>
        <div class="parent-element">
            <button class="navAlign" style="margin-right: 10px;">Projects</button>
            <button class="navAlign" style="margin-right: 3px;">About</button>
        </div>
    </h1>
    <hr style="margin-top: -10px; margin-bottom: -2px;">
    <h1>${project.title}</h1>
    <hr>

    <p>${project.description}</p>
    <a href="../index.html">
        <button class="vButton">Back To Projects</button>
    </a>
</body>
</html>
    `;
}