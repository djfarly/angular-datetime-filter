/**
 * Angular Datetime Filter
 * @version v0.1.0 - 2014-02-23
 * @link 
 * @author Jan Willem Henckel (djfarly)
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
'use strict';

/**
* datetimeFilter Module
*
* Description
*/
angular.module('datetimeFilter', [])
    .filter('upcoming', [function() {
        return function(array, dateField) {
            if (!Array.isArray(array)) return array;
            var now = new Date();
            var filtered = [];
            for (var j = 0; j < array.length; j++) {
                var value = array[j];
                var then = new Date(value[dateField]);
                if (now.getTime() < then.getTime()) {
                    filtered.push(value);
                }
            }
            return filtered;
        };
    }]);