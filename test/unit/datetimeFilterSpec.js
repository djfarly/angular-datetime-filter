/*global module, inject, beforeEach, expect, describe, it, stubDateConstructor */

//'use strict';

(function (global) {
  var NativeDate = global.Date;

  global.stubDateConstructor = function (fakeDate) {
      global.Date = function () {
          global.Date = NativeDate;
          return fakeDate;
      };
  };
}(this));

describe('truncate', function () {

    beforeEach(module('datetimeFilter'));

    describe('upcoming', function () {
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
    });
});