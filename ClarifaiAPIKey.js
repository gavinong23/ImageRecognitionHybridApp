const app = new Clarifai.App({
       apiKey: 'cb343cf076d847bb9ce1fa384b82cc95'
      });

      // predict the contents of an image by passing in a url
      app.models.predict(Clarifai.GENERAL_MODEL, 'https://samples.clarifai.com/metro-north.jpg').then(
        function(response) {
          console.log(response);
        },
        function(err) {
          console.error(err);
        }
      );

  API KEY: cb343cf076d847bb9ce1fa384b82cc95
