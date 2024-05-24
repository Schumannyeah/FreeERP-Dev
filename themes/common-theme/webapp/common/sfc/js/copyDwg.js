$(document).ready(function() {    
    // var folderInput = document.getElementById('myFolderInput');
    // var folderPath = document.getElementById('myFolderPath');
    // folderInput.addEventListener('change', function() {
    //     var folder = folderInput.files[0];
    //     var fullPath = folder.path || folder.webkitRelativePath;
    //     folderPath.value = folder.path;
    // }, false);

    // var folderInput = document.getElementById('myFolderInput');
    // var folderPath = document.getElementById('myFolderPath');
    // folderInput.addEventListener('change', function() {
    //     var folder = folderInput.files[0];
    //     var reader = new FileReader();
    //     reader.onload = function() {
    //     window.resolveLocalFileSystemURL(reader.result, function(entry) {
    //         folderPath.value = entry.fullPath;
    //     });
    //     };
    //     reader.readAsDataURL(folder);
    // }, false);

    var folderInput = document.getElementById('myFolderInput');
    var folderPath = document.getElementById('myFolderPath');
    folderInput.addEventListener('change', function() {
        var folder = folderInput.files[0];
        var relativePath = folder.webkitRelativePath;
        var absolutePath = folderInput.value;
        var fullPath = absolutePath.substring(0, absolutePath.lastIndexOf(relativePath));
        console.log(folder);
        console.log(relativePath);

        console.log(absolutePath);

        console.log(fullPath);

        folderPath.value = fullPath;
    }, false);
    
} );

function selectFolder() {

    // var input = document.createElement("input");
    // input.type = "file";
    // input.webkitdirectory = true;
    // input.multiple = false;
    // input.addEventListener("change", function() {
    //     // var filePath = this.files[0].path;
    //     // folderPath.value = filePath.substring(0, filePath.lastIndexOf("\\") + 1);
    //     // folderPath.value = this.files[0].webkitRelativePath.replace(this.files[0].name, "");
    //     // folderPath.value = this.files[0].name;
    //     folderPath.value = this.value;
    // });
    // input.click();
}
