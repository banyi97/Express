
var expect = require('chai').expect;
var getBrandsMw = require('../../middlewares/brand/getBrands');

describe('getBrandsMw middleware ', function () {

  it('should return brands', function (done) {
    var req = {
        session:{
            userid : ''
        }
    };
    var res = {
        locals : {}
    };
    var fakeBrandsModel = {
      find: function (some, cb) {
        cb(undefined, ['brand1', 'brand2'])
      }
    };
    getBrandsMw({
        Brand: fakeBrandsModel
      })(req, res, function (err) {
        expect(res.locals.brands).to.eql(['brand1', 'brand2']);
        expect(err).to.eql(undefined);
        done();
      });
  })
  it('should return with error', function (done) {
    var fakeBrandsModel = {
        find: function (some, cb) {
          cb('error2', undefined)
        }
      };
      getBrandsMw({
        Brand: fakeBrandsModel
      })({}, {}, function (err) {
        expect(err).to.eql('error2');
        done();
      });
  })
});