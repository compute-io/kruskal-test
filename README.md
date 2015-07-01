kruskal-test
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the Kruskal-Wallis test for equal medians.

The Kruskal-Wallis rank sum test evaluates for multiple samples the null hypothesis that their medians are identical. The Kruskal-Wallis test is a nonparametric test which does not require the data to be normally distributed.

To carry out the test, the rank sums `S_h` of the individual groups are calculated. The test statistic is then calculated as

<div class="equation" align="center" data-raw-text="H= \frac{\tfrac{12}{N(N+1)}\sum_h\tfrac{S_h^2}{n_h}-3(N+1)}{1-\tfrac{1}{(N^3-N)} \sum t_{r(i)}^3 - t_{r(i)}}" data-equation="eq:kruskal-test-statistic">
	<img src="https://cdn.rawgit.com/compute-io/kruskal-test/365e7d2b36f2011c905fc30177b949dedd4fff34/docs/img/eqn.svg" alt="Equation for the Kruskal-Wallis test statistic.">
	<br>
</div>

where `N` denotes the total number of observations and `t_{r(i)}` are the number of tied observations with rank $i$.

## Installation

``` bash
$ npm install compute-kruskal-test
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var kruskal = require( 'compute-kruskal-test' );
```

#### kruskal( a,b[c,...,k] )

For input arrays `a`, `b`, ... holding numeric observations, this function calculates the Kruskal-Wallis rank sums test, which tests the null hypothesis that the medians in all `k` groups are the same. The function returns an object holding the calculated test statistic `K`, the `pValue` of the test and the degrees of freedom (`df`).


## Examples

``` javascript
var kruskal = require( 'compute-kruskal-test' );

var x, y, z,
	out,
	table;

// data from Hollander & Wolfe (1973), 116.
x = [2.9, 3.0, 2.5, 2.6, 3.2];
y = [3.8, 2.7, 4.0, 2.4];
z = [2.8, 3.4, 3.7, 2.2, 2.0];

out = kruskal( x, y, z );
/*
{ H: 0.7714,
  df: 2,
  pValue: 0.6799 }
*/

table = out.toString();
/*
Kruskal-Wallis rank sum test.
	null hypothesis: the medians of all groups are the same.
	test statistic: 0.7714
	df: 2
	p-value: 0.68
*/
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-kruskal-test.svg
[npm-url]: https://npmjs.org/package/compute-kruskal-test

[travis-image]: http://img.shields.io/travis/compute-io/kruskal-test/master.svg
[travis-url]: https://travis-ci.org/compute-io/kruskal-test

[coveralls-image]: https://img.shields.io/coveralls/compute-io/kruskal-test/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/kruskal-test?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/kruskal-test.svg
[dependencies-url]: https://david-dm.org/compute-io/kruskal-test

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/kruskal-test.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/kruskal-test

[github-issues-image]: http://img.shields.io/github/issues/compute-io/kruskal-test.svg
[github-issues-url]: https://github.com/compute-io/kruskal-test/issues
