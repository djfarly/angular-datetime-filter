/**
 * Angular Datetime Filter
 * @version v0.1.2-6 - 2014-02-23
 * @link https://github.com/djfarly/angular-datetime-filter
 * @author Jan Willem Henckel (djfarly)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

/**
* datetimeFilter Module
*
* 'upcoming' and 'past' are decorators for the 'datetimeFilter'-filter
*/
angular.module('datetimeFilter', [])
    .filter('upcoming', ['$filter', function($filter) {
        return function(array, dateField) {
            return $filter('datetimeFilter')(array, dateField, 'upcoming');
        };
    }])

    .filter('past', ['$filter', function($filter) {
        return function(array, dateField) {
            return $filter('datetimeFilter')(array, dateField, 'past');
        };
    }])

    .filter('datetimeFilter', [function() {
        return function(array, dateField, mode) {
            if (!Array.isArray(array)) return array;
            if (!(mode === 'upcoming' || mode === 'past')) mode = 'upcoming';
            var now = new Date();
            var filtered = [];
            for (var j = 0; j < array.length; j++) {
                var value = array[j];
                if (typeof dateField !== 'undefined') {
                    value = value[dateField];
                }
                var then = new Date(value);
                if ((mode === 'upcoming' && now.getTime() < then.getTime()) ||
                    (mode === 'past' && now.getTime() > then.getTime())) {
                    filtered.push(array[j]);
                }

            }
            return filtered;
        };
    }]);