angular-datetime-filter
=======================

AngularJS Datetime Filter

> [AngularJS](angularjs.org) filters for filtering arrays.
The filters may be used just like the native filter-filter. `| upcoming:date` filters for array-elements which have their property date in the future.

##How to use
###Array of objects
```javascript
$scope.items = [
    {'date': '2014/01/02', 'name': 'one'},
    {'date': '2013/12/24', 'name': 'two'},
    {'date': '2014/10/03', 'name': 'three'},
    {'date': '2012/01/01', 'name': 'four'},
    {'date': '1970/01/01', 'name': 'five'},
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
