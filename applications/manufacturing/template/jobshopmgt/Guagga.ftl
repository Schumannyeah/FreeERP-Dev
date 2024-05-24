<#--
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing,
software distributed under the License is distributed on an
"AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, either express or implied.  See the License for the
specific language governing permissions and limitations
under the License.
-->
<#--  <div>
    <video id="camera" width="640" height="480"></video>
</div>  -->
<head>
    <meta charset="UTF-8">
    <title>QR Code Scanner</title>
</head>
<body>
    <h1>QR Code Scanner</h1>
    <video id="camera" width="100%" height="auto" playsinline></video>
    <input type="text" id="qrResult" placeholder="Scanned QR Code" readonly>

    <script>
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                var video = document.getElementById('camera');
                video.srcObject = stream;
                video.play();

                Quagga.init({
                    inputStream: {
                        name: 'Live',
                        type: 'LiveStream',
                        target: video
                    },
                    decoder: {
                        readers: ['ean_reader']
                    }
                }, function (err) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    Quagga.start();
                });

                Quagga.onDetected(function (result) {
                    var qrResult = document.getElementById('qrResult');
                    qrResult.value = result.codeResult.code;
                    // Send the QR code data to the backend for further processing
                    // You may use AJAX to send this data to the server.
                });
            });
        }
    </script>
</body>