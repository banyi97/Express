
var expect = require('chai').expect;
var getAllAddressMw = require('../../middlewares/address/getAllAddress');

describe('getAllAddressMw middleware ', function () {

  it('should return address', function (done) {
    var req = {
        session:{
            userid : ''
        }
    };
    var res = {
        locals : {}
    };
    var fakeAddressModel = {
      find: function (some, cb) {
        cb(undefined, ['address1', 'address2'])
      }
    };
    getAllAddressMw({
        Address: fakeAddressModel
      })(req, res, function (err) {
        expect(res.locals.address).to.eql(['address1', 'address2']);
        expect(err).to.eql(undefined);
        done();
      });
  })
  it('should return with error', function (done) {
    var req = {
        session:{
            userid : ''
        }
    };
    var res = {
    };
    var fakeAddressModel = {
      find: function (some, cb) {
        cb('error1', undefined)
      }
    };
    getAllAddressMw({
        Address: fakeAddressModel
      })(req, res, function (err) {
        expect(err).to.eql('error1');
        done();
      });
  })
});