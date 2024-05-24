// Check if getUserMedia is available and prompt the user for camera access
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
        var videoElement = document.getElementById('camera');
        videoElement.srcObject = stream;
        videoElement.play();

        // Initialize QuaggaJS with the desired configuration
        Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                target: videoElement,
            },
            decoder: {
                readers: ["code_128_reader"], // Configure the barcode format you want to recognize
            },
        });

        // Add an event listener for when a barcode is detected
        Quagga.onDetected(function (result) {
            var barcode = result.codeResult.code;
            
            // Check if the barcode starts with "522-"
            if (barcode.startsWith("522-")) {
                console.log("Valid Barcode: " + barcode);
                // Add your logic here for handling valid barcodes
            } else {
                console.log("Invalid Barcode: " + barcode);
            }
        });

        // Start QuaggaJS
        Quagga.start();
    }).catch(function (error) {
        console.log("Camera access denied:", error);
    });
} else {
    console.log("getUserMedia not supported");
}