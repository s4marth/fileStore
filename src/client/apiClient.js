const axios = require('axios');
const fs = require('fs'); 
const path = require('path'); 


const SERVER_URL = 'http://localhost:3000/files';


const addFile = async (fileDataArray) => {
    if (!fileDataArray || fileDataArray.length === 0) {
        throw new Error('File data is required');
    }
    try {
        const response = await axios.post(`${SERVER_URL}/add`, { files: fileDataArray });
        const results = response.data.responses;

        results.forEach((result) => {
            if (result.error) {
                console.error(`Error adding file ${result.filename}: ${result.error}`);
            } else {
                console.log(result.message);
            }
        });
    } catch (error) {
        console.error('Error adding files:', error.response ? error.response.data : error.message);
    }
};


const listFiles = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/list`);
        console.log('Files in store:', response.data.files.join(', '));
    } catch (error) {
        console.error('Error fetching files:', error);
    }
};

const removeFile = async (filename) => {
    if (!filename) {
        throw new Error('Filename is required');
    }
    try {
        console.log('Sending delete request for filename:', filename);
        const response = await axios.delete(`${SERVER_URL}/remove`, {
            data: { filename }, 
        });
        console.log(response.data.message);
    } catch (error) {
        console.error(
            'Error removing file:',
            error.response ? error.response.data : error.message
        );
    }
};

const updateFile = async (filename, content) => {
    if (!filename || !content) {
        throw new Error('Filename and content are required');
    }
    const response = await axios.put(`${SERVER_URL}/update`, { filename, content });
    console.log(response.data.message);
};

const getWordCount = async () => {
    try {
        const response = await axios.get(`${SERVER_URL}/wc`);
        console.log(`Total words in the store: ${response.data.totalWords}`);
    } catch (error) {
        console.error('Error fetching word count:', error.response ? error.response.data : error.message);
    }
};

const getFrequentWords = async (limit = 10, order = 'dsc') => {
    try {
        const response = await axios.get(`${SERVER_URL}/freq-words`, {
            params: { limit, order }
        });
        console.log('Frequent words:', response.data.words);
    } catch (error) {
        console.error('Error fetching frequent words:', error.message);
    }
};

module.exports = { addFile, listFiles, removeFile, updateFile, getWordCount, getFrequentWords};
