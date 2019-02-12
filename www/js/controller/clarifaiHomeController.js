var controllersModule = angular.module('clarifai.clarifaiHomeController',['ngCordova'])



function clarifaiHomeCtrl(imageRecognitionService,$scope,$cordovaCamera, $state, $ionicModal,$rootScope,$ionicLoading){
   // var imageUrl = "img/ionic.png";
    $ionicModal.fromTemplateUrl('view/modal/imagePopUpModal.html', {
      scope: $scope,
      animation: 'slide-in-up'

    }).then(function(modal) {
     $scope.modal = modal;
     // $scope.choosenImg = imageUrl;
    // $scope.modal.show();
    });
  // $scope.openModal = function() {
  //  $scope.modal.show();
  // };

    $scope.closeModal = function() {
     $scope.modal.hide();
    };
    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
     $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
     // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
     // Execute action
    });



  $scope.onClickCamera = function(source){
    // var source = Camera.PictureSourceType.CAMERA;

    imageRecognitionService.openCamera(source).then(function(imageData){



      imageRecognitionService.imageRecognition(imageData).then(function(response){

    

        // outputs.data.concepts.name
        $scope.data = response.outputs[0].data.concepts;
        $scope.choosenImg = "data:image/png;base64,"+imageData;

        $scope.modal.show();




      }, function(err){

      });



    },function(err){

    });


  }



}








controllersModule.controller('clarifaiHomeCtrl',clarifaiHomeCtrl);
controllersModule.controller('imagePopUp')
