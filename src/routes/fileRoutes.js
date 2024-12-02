const express = require('express');
const { addFile, listFiles, removeFile, updateFile, countWordsInStore, getFrequentWords} = require('../services/fileService');

const router = express.Router();

//routes
router.get('/', async(req, res)=>{
    res.status(200).json({ message: 'hello there'});
})

router.post('/add', addFile);         
router.get('/list', listFiles);        

router.delete('/remove', async (req, res) => {
    try {
        const { filename } = req.body; //(file name from request)
        console.log('filename aaya:', filename);

        if (!filename || typeof filename !== 'string') {
            return res.status(400).json({ error: 'Invalid filename. Please provide a valid string.' });
        }

        await removeFile(filename); //(after vrify we call the service fn)
        res.status(200).json({ message: `File ${filename} removed successfully.` });
    } catch (error) {
        console.error('Error in /remove route:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.put('/update', async (req, res) => {
    try {
        const { filename, content } = req.body; 
        if (!filename || !content) {
            return res.status(400).json({ error: 'Filename and content are required' });
        }
        await updateFile(filename, content); 
        res.status(200).json({ message: `File ${filename} updated successfully.` });
    } catch (error) {
        console.error('Error in /update route:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/wc', async (req, res) => {
    try {
        const totalWords = await countWordsInStore();
        res.status(200).json({ totalWords });
    } catch (error) {
        console.error('Error in /wc route:', error.message);
        res.status(500).json({ error: error.message });
    }
});


router.get('/freq-words', async (req, res) => {
    try {
        const { limit = 10, order = 'dsc' } = req.query; 
        const result = await getFrequentWords(limit, order);
        res.status(200).json({ words: result });
    } catch (error) {
        console.error('Error in /freq-words route:', error.message);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router; 