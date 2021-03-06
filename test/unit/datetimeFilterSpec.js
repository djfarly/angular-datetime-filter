/*global module, inject, beforeEach, expect, describe, it, stubDateConstructor */

// Override the Date class constructor, to be able to make fake dates
(function (global) {
  var NativeDate = global.Date;

  global.stubDateConstructor = function (fakeDate) {
      global.Date = function () {
          global.Date = NativeDate;
          return fakeDate;
      };
  };
}(this));

describe('Module datetimeFilter:', function () {

    beforeEach(module('datetimeFilter'));

    describe('The upcoming filter', function () {
        var upcomingFilter;

        beforeEach(inject(function ($filter) {
            upcomingFilter = $filter('upcoming');
        }));

        it('should reduce the array to elements upcoming to 2014/01/01', function () {
            
            stubDateConstructor(new Date('2014/01/01'));

            var before = [
                {'date': '2014/01/02'},
                {'date': '2013/12/24'},
                {'date': '2014/10/03'},
                {'date': '2012/01/01'},
                {'date': '1970/01/01'}
            ];

            var after = [
                {'date': '2014/01/02'},
                {'date': '2014/10/03'}
            ];

            expect(upcomingFilter(before, 'date')).toEqual(after);
        });

        it('should reduce the array to elements upcoming to 2014/01/01', function () {
            
            stubDateConstructor(new Date('01.01.2014'));

            var before = [
                '2014/01/02',
                '2013/12/24',
                '2014/10/03',
                '2012/01/01',
                '1970/01/01'
            ];

            var after = [
                '2014/01/02',
                '2014/10/03'
            ];

            expect(upcomingFilter(before)).toEqual(after);
        });
    });

    describe('The past filter', function () {
        var pastFilter;

        beforeEach(inject(function ($filter) {
            pastFilter = $filter('past');
        }));

        it('should reduce the array to elements before to 2014/01/01', function () {
            
            stubDateConstructor(new Date('2014/01/01'));

            var before = [
                {'date': '2014/01/02'},
                {'date': '2013/12/24'},
                {'date': '2014/10/03'},
                {'date': '2012/01/01'},
                {'date': '1970/01/01'}
            ];

            var after = [
                {'date': '2013/12/24'},
                {'date': '2012/01/01'},
                {'date': '1970/01/01'}
            ];

            expect(pastFilter(before, 'date')).toEqual(after);
        });

        it('should reduce the array to elements before 2014/01/01', function () {
            
            stubDateConstructor(new Date('01.01.2014'));

            var before = [
                '2014/01/02',
                '2013/12/24',
                '2014/10/03',
                '2012/01/01',
                '1970/01/01'
            ];

            var after = [
                '2013/12/24',
                '2012/01/01',
                '1970/01/01'
            ];

            expect(pastFilter(before)).toEqual(after);
        });
    });
});