angular-datetime-filter
=======================

AngularJS Datetime Filter

[AngularJS](angularjs.org) filters for filtering arrays.
The filters may be used just like the native filter-filter.

`| __upcoming:date__` filters for array elements which date property is in the future.

`| __past:date__` filters for array elements which date property is in the past.

##Install
Install with `bower`:
```
bower install angular-datetime-filter
```
Add a `<script>` to you `index.html`:
```html
<script src="/bower_components/angular-datetime-filter/dist/angular-datetime-filter.js"></script>
```
And add `datetimeFilter` as a dependency for your app:
```javascript
angular.module('myApp', ['datetimeFilter']);
```

##How to use
###Array of objects
```javascript
$scope.items = [
    {'date': '2014/01/02', 'name': 'one'},
    {'date': '2013/12/24', 'name': 'two'},
    {'date': '2014/10/03', 'name': 'three'},
    {'date': '2012/01/01', 'name': 'four'},
    {'date': '1970/01/01', 'name': 'five'}
];
```
```html
<ul>
    <li ng-repeat="item in items | upcoming:date">{{item.name}}
</ul>
```
Assuming today is 2014/01/01; This should result in:
* one
* three

Whereas this:
```html
<ul>
    <li ng-repeat="item in items | past:date">{{item.name}}
</ul>
```
Should result in:
* two
* four
* five

###Simple datetime array
```javascript
$scope.items = [
    '2014/01/02',
    '2013/12/24',
    '2014/10/03',
    '2012/01/01',
    '1970/01/01'
];
```
```html
<ul>
    <li ng-repeat="item in items | upcoming">{{item}}
</ul>
```
Should result in:
* 2014/01/02
* 2014/10/03

## Documentation

>Angular module datetimeFilter

###upcoming
```html
{{ filter_expression | upcoming : dateField }}
```
```javascript
$filter('upcoming')(array, dateField)
```
__array__ `array` - The source array

__dateField__ `string` (_optional_) - the datetime property, defaults to none
###past
```html
{{ filter_expression | past : dateField }}
```
```javascript
$filter('past')(array, dateField)
```
__array__ `array` - The source array

__dateField__ `string` (_optional_) - the datetime property, defaults to none
###datetimeFilter
```html
{{ filter_expression | datetimeFilter : dateField : mode }}
```
```javascript
$filter('datetimeFilter')(array, dateField, mode)
```
__array__ `array` - The source array

__dateField__ `string` (_optional_) - the datetime property, defaults to none

__mode__ `string` (_optional_) - Either 'past' or 'upcoming', defaults to 'upcoming'
