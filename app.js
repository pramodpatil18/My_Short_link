angular.module('linkShortenerApp', [])
  .controller('MainController', ['$scope', '$timeout', function($scope, $timeout) {
    var vm = this;
    vm.url = '';
    vm.shortUrl = '';
    vm.expirationTime = '';
    vm.errorMessage = '';

    vm.generateShortUrl = function() {
      // Validate URL structure
      if (!validateUrl(vm.url)) {
        vm.errorMessage = 'Invalid URL structure';
        return;
      }

      // Check for duplicate URLs
      if (isDuplicateUrl(vm.url)) {
        vm.errorMessage = 'URL already exists';
        return;
      }

      // Generate short URL
      vm.shortUrl = generateRandomString(6);
      vm.expirationTime = new Date(Date.now() + 5 * 60000); // 5 minutes from now

      // Simulate saving the short URL and expiration time to a server/database
      // You can replace this with your own server-side implementation
      saveShortUrl(vm.url, vm.shortUrl, vm.expirationTime);

      // Reset form
      vm.url = '';
      vm.errorMessage = '';
    };

    // Function to validate URL structure
    function validateUrl(url) {
      // Implement your own URL structure validation logic here
      return true;
    }

    // Function to check for duplicate URLs
    function isDuplicateUrl(url) {
      // Implement your own logic to check for duplicate URLs here
      return false;
    }

    // Function to generate a random string of given length
    function generateRandomString(length) {
      var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      var randomString = '';
      for (var i = 0; i < length; i++) {
        randomString += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return randomString;
    }

    // Simulated function to save short URL and expiration time to server/database
    function saveShortUrl(url, shortUrl, expirationTime) {
      // Implement your own server/database logic to save the data here
    }

    // Function to handle expiration of the short URL
    function handleExpiration() {
      var currentTime = Date.now();
      if (currentTime > vm.expirationTime) {
        vm.shortUrl = '';
        vm.expirationTime = '';
        alert('The short URL has expired');
      } else {
        $timeout(handleExpiration, 60000); // Check every minute
      }
    }

    // Start checking for expiration
    $timeout(handleExpiration, 60000); // Check every minute
  }]);