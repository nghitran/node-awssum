var fmt = require('fmt');
var awssum = require('awssum');
var amazon = awssum.load('amazon/amazon');
var DynamoDB = awssum.load('amazon/dynamodb').DynamoDB;

var env = process.env;
var accessKeyId = process.env.ACCESS_KEY_ID;
var secretAccessKey = process.env.SECRET_ACCESS_KEY;
var awsAccountId = process.env.AWS_ACCOUNT_ID;

var ddb = new DynamoDB({
    'accessKeyId' : accessKeyId,
    'secretAccessKey' : secretAccessKey,
    'awsAccountId' : awsAccountId,
    'region' : amazon.US_EAST_1
});

fmt.field('Region', ddb.region() );
fmt.field('EndPoint', ddb.host() );
fmt.field('AccessKeyId', ddb.accessKeyId() );
fmt.field('SecretAccessKey', ddb.secretAccessKey().substr(0, 3) + '...' );
fmt.field('AwsAccountId', ddb.awsAccountId() );

var table = {
    TableName : 'test-to-delete',
};

ddb.DeleteTable(table, function(err, data) {
    fmt.msg("deleting a table - expecting success");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});

var testTable = {
    TableName : 'test',
};

ddb.DeleteTable(testTable, function(err, data) {
    fmt.msg("deleting the test table - expecting success");
    fmt.dump(err, 'Error');
    fmt.dump(data, 'Data');
});