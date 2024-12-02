# File Store   

A simple file store service implemented using Node.js that supports storing, updating, deleting, and performing operations on plain text files through cli.  

## Features  
- Add single or multiple files to the store.  
- Update the contents of a file in the store.  
- Remove files from the store.  
- List all stored files.  
- Perform operations like word count and most/least frequent words across files.  

---

## Steps to follow  

1. **Clone the repository:**  ```git clone https://github.com/s4marth/fileStore.git```
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


## Deployment
1. Create docker image: ```docker build -t file-store-service:latest```
2. Push the image to docker hub after login: ```docker push file-store-service:latest```
3. In deployment file, specify the name of this published image.
4. Create service yaml file
5. Deployment with help of minikube and kubectl: <br/>
```kubectl apply -f deployment.yaml```<br/>
```kubectl apply -f service.yaml```<br/>
```minikube service file-store-service```

to see the status: ```minikube status``` <br/>
to see status of pods: ```kubectl get pods```
