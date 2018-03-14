console.log("App.js Loaded");

var photoText = document.getElementById("photo-text");
var photo = document.getElementById("photo");
var photoIndex = 0;
var photoArray = ["images/sxsw2018.jpg", "images/eclipse2017.jpg", "images/dex.jpg", "images/bonefire.jpg"]
var photoTextArr = [
    "Hacking away with Chris Hughes and others at SXSW 2018.",
    "Seeing the awesome 2017 Eclipse with my beautiful wife.",
    "My goofy dog Dex having fun driving. Well maybe not really driving.",
    "Fun time at the Aggie Bonfire in College with my wife Isbeth."
] 
function changePhotoLeft(){
    if(photoIndex <= 0){
        console.log(photo)
        photoIndex = photoArray.length - 1;
        photo.src = photoArray[photoIndex]
        photoText.innerHTML = photoTextArr[photoIndex]
    }
    else {
        photoIndex = photoIndex - 1;
        photo.src = photoArray[photoIndex]
        photoText.innerHTML = photoTextArr[photoIndex]
    }
}
function changePhotoRight(){
    if(photoIndex >= photoArray.length - 1){
        photoIndex = 0
        photo.src = photoArray[photoIndex]
        photoText.innerHTML = photoTextArr[photoIndex]
    }
    else {
        photoIndex = photoIndex + 1;
        photo.src = photoArray[photoIndex];
        photoText.innerHTML = photoTextArr[photoIndex]
    }
}