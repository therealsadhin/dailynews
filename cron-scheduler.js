const cron = require('node-cron');
const { exec } = require('child_process');
const path = require('path');

// Get the directory where the script is located
const scriptDir = __dirname;

// Function to run the scheduler
function runScheduler() {
    console.log('Running scheduler at:', new Date().toISOString());
    
    // Path to the scheduler script
    const schedulerPath = path.join(scriptDir, 'src/scripts/startScheduler.ts');
    
    // Command to run the scheduler
    const command = `npx ts-node ${schedulerPath}`;
    
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

// Schedule to run every day at 00:00 (midnight)
cron.schedule('0 0 * * *', () => {
    runScheduler();
});

// Run immediately when script starts
runScheduler();
