const fs = require('fs');
const path = require('path');

// A very important function which will give us all the files/folders of the required folder.
module.exports = (directory, foldersOnly = false) => {

    // foldersOnly is a boolean value (default => false)
    // if provided true:
    //       then will return only the folders of the directory
    //  else: 
    //       will give only the file names of the directory
    
    // fileNames is an empty array in which we will push all the files
    let fileNames = [];

    // Here files will get all the files and folders mix from the provided directory
    const files = fs.readdirSync(directory, {withFileTypes: true});

    for(const file of files){

        // We will the file paths of the files/folders in the fileNames[]
        const filePath = path.join(directory, file.name);

        if(foldersOnly){
            if(file.isDirectory()){
                fileNames.push(filePath);
                // Only pushing the folders here
            }
        }

        else{
            if(file.isFile()){
                fileNames.push(filePath);
                // Only pushing the files here
            }
        }

    }

    // Return fileNames array after pushing the all the files/folders of the directory
    return fileNames;

};