const { exec } = require('child_process');
const path = require('path');

// Get the directory where the script is located
const scriptDir = __dirname;

// Function to run the scheduler
function runScheduler() {
    console.log('Running scheduler at:', new Date().toISOString());
    
    // Path to Node.js executable in cPanel (using full path)
    const nodePath = '/usr/local/bin/node';
    
    // Path to the scheduler script
    const schedulerPath = path.join(scriptDir, 'src/scheduler.ts');
    
    // Command to run the scheduler with ts-node
    const command = `${nodePath} -r ts-node/register ${schedulerPath}`;
    
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error running scheduler:', error);
            return;
        }
        if (stderr) {
            console.error('Scheduler stderr:', stderr);
        }
        console.log('Scheduler output:', stdout);
    });
}

// Run immediately when script starts
runScheduler();
