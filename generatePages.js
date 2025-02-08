const fs = require('fs');
const path = require('path');

// Paths
const projectsPath = path.join(__dirname, 'projects.json');
const outputDir = path.join(__dirname, 'generated-pages');

// Remove and recreate output directory
if (fs.existsSync(outputDir)) {
    fs.rmSync(outputDir, { recursive: true, force: true });
}
fs.mkdirSync(outputDir, { recursive: true });

// Path to template.html
const templatePath = path.join(__dirname, 'template.html');

// Read the template file once and cache it (for performance)
let templateHTML = '';
try {
    templateHTML = fs.readFileSync(templatePath, 'utf8');
} catch (err) {
    console.error('Error reading template.html:', err);
    process.exit(1);
}

// Read projects.json
fs.readFile(projectsPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading projects.json:', err);
        process.exit(1);
    }

    try {
        const projects = JSON.parse(data).projects;

        projects.forEach(project => {
            const fileName = project.title.replace(/[^a-z0-9]/gi, '_').toLowerCase() + '.html';
            const outputPath = path.join(outputDir, fileName);
            const htmlContent = generateHTML(project);

            fs.writeFile(outputPath, htmlContent, (err) => {
                if (err) {
                    console.error(`Error writing file ${fileName}:`, err);
                } else {
                    console.log(`Generated ${fileName}`);
                }
            });
        });
    } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        process.exit(1);
    }
});

// Function to generate HTML based on template.html
function generateHTML(project) {
    return templateHTML
        .replace(/{{title}}/g, project.title)
        .replace(/{{description}}/g, project.description)
        .replace(/{{photosList}}/g, generatePhotoListHTML(project.photos || []));
}

// Function to generate <ul> list of photos dynamically
function generatePhotoListHTML(photos) {
    return photos.map(photoObj => {
        const [photo, description] = Object.entries(photoObj)[0];
        return `
            <li>
                <div class="image-wrapper">
                    <img src="../images/${photo}" alt="Image of ${photo}">
                </div>
                <p>${description}</p>
            </li>
        `;
    }).join('');
}