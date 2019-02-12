
angular.module('clarifai.service', ['ngCordova'])


.factory('imageRecognitionService',function(ENV,APIKEY, $q, $cordovaCamera,$ionicLoading){

  service = {
    openCamera : openCamera,
    imageRecognition : imageRecognition
  };

  function openCamera(source){

   var deferred = $q.defer();

   var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL, //data_url, file_uri
        sourceType: source, //Camera.PictureSourceType.CAMERA
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
     };



    $cordovaCamera.getPicture(options).then(function(imageData){
      //var lblImageData = document.getElementById('testImageData');

      //$scope.myImage = "data:image/jpeg;base64," +imageData;
      //var contentType = 'image/png';
      //blob = b64toBlob(imageData, contentType);

        //deferred.resolve('data:image/jpeg;base64,'+imageData);
        deferred.resolve(imageData);
    }, function(err){
       deferred.reject();
    });

    return deferred.promise;
  }



  function imageRecognition(img){

    const app = new Clarifai.App({
           apiKey: APIKEY.CLARIFAI_KEY
    });

    var deferred = $q.defer();

    app.models.predict(Clarifai.GENERAL_MODEL, img).then(
      function(response) {

        if(response.status.code == 10000 && response.status.description == "Ok"){

        
          deferred.resolve(response);
          // console.log(response.outputs[0].data);
        }
      },
      function(err) {
        // console.error(err);

        deferred.reject(err);
      }
    );


    return deferred.promise;
  }

  return service;


})
