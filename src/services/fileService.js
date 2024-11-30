const fs = require('fs');
const path = require('path');

const fileStorePath = path.join(__dirname, '../../store');
if (!fs.existsSync(fileStorePath)) {
    fs.mkdirSync(fileStorePath);
}



// Add a file to the store
const addFile = (req, res) => {
    const { files } = req.body;

    if (!files || !Array.isArray(files) || files.length === 0) {
        return res.status(400).json({ error: 'Files data is required' });
    }

    const responses = files.map(({ filename, content }) => {
        if (!filename || !content) {
            return { filename, error: 'Filename and content are required' };
        }
        const filePath = path.join(fileStorePath, filename);
        if (fs.existsSync(filePath)) {
            return { filename, error: 'File already exists' };
        }
        fs.writeFileSync(filePath, content, 'utf8');
        return { filename, message: `File ${filename} added successfully!` };
    });
    return res.status(201).json({ responses });
};



// List all files in the store
const listFiles = (req, res) => {
    console.log('Received request to list files');
    fs.readdir(fileStorePath, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return res.status(500).json({ error: 'Failed to list files' });
        }
        console.log('Files found:', files);
        return res.status(200).json({ files });
    });
};

// Remove a file from the store
const removeFile = async (filename) => {
    console.log('Inside removeFile service. Filename:', filename);
    if (!filename || typeof filename !== 'string') {
        throw new Error('Invalid filename provided to removeFile function');
    }

    const filePath = path.join(fileStorePath, filename);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File ${filename} not found`);
    }

    await fs.promises.unlink(filePath); //(for dlting)
    console.log(`File ${filename} deleted successfully.`);
};

// Update a file with new content
const updateFile = async (filename, content) => {
    const filePath = path.join(fileStorePath, filename);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File ${filename} not found`);
    }
    await fs.promises.writeFile(filePath, content, 'utf8');
};

///////////////////////////////////////////////////////////////////


const countWordsInStore = async () => {
    try {
        const files = await fs.promises.readdir(fileStorePath);
        let totalWords = 0;

        for (const file of files) {
            const filePath = path.join(fileStorePath, file);
            const content = await fs.promises.readFile(filePath, 'utf8');
            const wordCount = content.split(/\s+/).filter(Boolean).length; // (Split by whitespace and filter out empty strings)
            totalWords += wordCount;
        }

        return totalWords;
    } catch (error) {
        console.error('Error in counting words:', error.message);
        throw new Error('Failed to count words in the store');
    }
};

//////////////////////////////////////////////////////////////////////

const getWordsFromFile = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    const words = content.split(/\s+/); 
    console.log('words:', words)
    return words.filter(word => word.length > 0); // (remove '')
};

// Function to count word frequencies in a list of words
const countWordFrequencies = (words) => {
    const wordCount = {};
    words.forEach(word => {
        word = word.toLowerCase(); 
        wordCount[word] = (wordCount[word] || 0) + 1;
    });
    console.log('count', wordCount)
    return wordCount;
};

// Function to get frequent words
const getFrequentWords = async (limit = 10, order = 'dsc') => {
    try {
        const files = fs.readdirSync(fileStorePath); //(have to see all the files present here)

        const allWords = [];
        files.forEach(file => {
            const filePath = path.join(fileStorePath, file);
            const words = getWordsFromFile(filePath);
            allWords.push(...words);
        });

        const wordCount = countWordFrequencies(allWords);

        //(here we are mapping them into word and freq pair wise)
        const sortedWords = Object.entries(wordCount).sort((a, b) => {
            if(order==='asc') return a[1] -b[1];
            else return b[1]-a[1];
        });

        // (return top given limit frequent words)
        return sortedWords.slice(0, limit).map(([word, count]) => ({ word, count }));
    } catch (error) {
        throw new Error(`Error processing frequent words: ${error.message}`);
    }
};


module.exports = { addFile, listFiles, removeFile, updateFile, countWordsInStore, getFrequentWords};
