Webcam.set({
    width: 350,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function captureImg() {
    Webcam.snap(function(data_uri) {
        document.getElementById('resultImg').innerHTML = '<img id="captured_img" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/zzX4ZenqT/model.json', modelLoaded);

function modelLoaded() {
    window.alert('Model has been loaded');
}

function identifyImg() {
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("object_name").innerHTML = results[0].label;
        document.getElementById("object_accuracy").innerHTML = results[0].confidence.toFixed(3);
    }
} 