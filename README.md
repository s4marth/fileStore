# File Store   

A simple file store service implemented using Node.js that supports storing, updating, deleting, and performing operations on plain text files.  

## Features  
- Add single or multiple files to the store.  
- Update the contents of a file in the store.  
- Remove files from the store.  
- List all stored files.  
- Perform operations like word count and most/least frequent words across files.  

---

## Steps to follow  

1. **Clone the repository:**  ```git clone fileStore```
2. **Install dependencies:** ```npm install```
3. **Start the server:** ```node src/server.js```

## Usage

1. Add a single file: ```store add filename.txt "file content"```
2. Add multiple files: ```store add file1.txt "content1" file2.txt "content2"```
3. List Files: ```store ls```
4. Remove Files: ```store rm filename.txt```
5. Update a File: ```store update filename.txt "new content"```
6. Word Count: ```store wc```
7. Most/Least Frequent Words: ```store freq-words --limit 10 --order dsc/asc```
