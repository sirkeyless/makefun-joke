import * as fs from 'fs';
import * as path from 'path';

const joke = 'Of course it works on my machine, because my machine is not currently being watched by twelve investors and a live cursor.';
const outputDir = path.join(__dirname, 'output');
const outputFilePath = path.join(outputDir, 'entry.txt');
const absoluteOutputFilePath = path.join('/', 'output', 'entry.txt');

try {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    // Write to relative path
    fs.writeFileSync(outputFilePath, joke, 'utf-8');
    console.log(`Joke written to ${outputFilePath}`);

    // Write to absolute path defensively (ignoring EACCES)
    try {
        fs.writeFileSync(absoluteOutputFilePath, joke, 'utf-8');
        console.log(`Joke written to ${absoluteOutputFilePath}`);
    } catch (e) {
        // Ignore EACCES as per instructions
        console.warn('Could not write to absolute path /output/entry.txt (EACCES likely).');
    }

} catch (e) {
    console.error('Failed to write entry.txt:', e.message);
    process.exit(1);
}