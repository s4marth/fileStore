#!/usr/bin/env node
const { addFile, listFiles, removeFile, updateFile, getWordCount, getFrequentWords} = require('./client/apiClient');

const command = process.argv[2];
const args = process.argv.slice(3);



//(for freq of word)
const argsfordreq = process.argv.slice(2); //(skip the first two)
let limit = 10; 
let order = 'dsc'; 
argsfordreq.forEach((arg, index) => {
    if (arg === '--limit' || arg === '-n') {
        limit = parseInt(argsfordreq[index + 1], 10); 
    }
    if (arg === '--order') {
        order = argsfordreq[index + 1]; 
    }
});


const addFilesCommand = async (args) => {
    if (args.length % 2 !== 0) {
        console.error('Invalid input. Please provide pairs of filenames and content.');
        return;
    }
    const fileDataArray = [];
    for (let i = 0; i < args.length; i += 2) {
        const filename = args[i];
        const content = args[i + 1];
        fileDataArray.push({ filename, content });
    }
    await addFile(fileDataArray);
};

const printUsage = () => {
    console.log(`Usage:
    store add <filename> <content>   # Add a file
    store ls                        # List all files
    store rm <filename>             # Remove a file
    store update <filename> <content> # Update file contents
    store wc                        # Get total word count
    store freq-words [--limit|-n 10] [--order=dsc|asc] 
    `);
};

const main = async () => {
    try {
        switch (command) {
            case 'add':
                addFilesCommand(args)
                break;
            case 'ls':
                await listFiles();
                break;
            case 'rm':
                await removeFile(args[0]);
                break;
            case 'update':
                await updateFile(args[0], args[1]);
                break;
            case 'wc':
                await getWordCount();
                break;
            case 'freq-words':
                await getFrequentWords(limit, order);
                break;
            default:
                printUsage();
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
};

main();
