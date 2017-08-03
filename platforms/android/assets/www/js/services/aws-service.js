var app = angular.module('whatiate');

app.service('AwsService', function(AwsConfig) {
  var self = this;

  AWS.config.credentials = new AWS.Credentials(AwsConfig.AKID, AwsConfig.SAK);
  AWS.config.region = AwsConfig.REGION;

  self.bucket = new AWS.S3({
    params: {
      Bucket: AwsConfig.BUCKET
    }
  });

  return self;
});
