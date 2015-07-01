/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	kruskal = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-kruskal-test', function tests() {

	it( 'should export a function', function test() {
		expect( kruskal ).to.be.a( 'function' );
	});

	it( 'should throw an error if an argument is not array-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
			5,
			true,
			undefined,
			null,
			NaN,
			function(){},
			{}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				kruskal( value, [] );
			};
		}
	});


	it( 'should throw an error if not provided at least two arrays as arguments', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
				kruskal( [ 2, 3, 4 ] );
		}
	});

	it( 'should throw an error if not provided an empty array as an argument', function test() {
		expect( badValue ).to.throw( Error );
		function badValue() {
				kruskal( [ 2, 3, 4 ], [] );
		}
	});

	it( 'should calculate the Kruskal-Wallis test for input arrays', function test() {
		var x, y, z, actual;

		// data from Hollander & Wolfe (1973), 116.
		x = [2.9, 3.0, 2.5, 2.6, 3.2];
		y = [3.8, 2.7, 4.0, 2.4];
		z = [2.8, 3.4, 3.7, 2.2, 2.0];

		actual = kruskal( x, y, z );

		// evaluated in R
		assert.closeTo( actual.H,  0.77143, 1e-4 );
		assert.deepEqual( actual.df, 2 );
		assert.closeTo( actual.pValue, 0.68, 1e-4 );

		// case with ties:
		actual = kruskal( [ 2, 2, 5, 7 ], [ 3, 3, 4, 9 ] );

		// evaluated in R
		assert.closeTo( actual.H,  0.34146, 1e-4 );
		assert.deepEqual( actual.df, 1 );
		assert.closeTo( actual.pValue, 0.559, 1e-4 );

	});


	it( 'should print a formatted output via .toString() method', function test() {
		var actual;

		actual = kruskal( [ 2, 4, 5], [ 1, 3, 6 ] );

		expect( actual.toString() ).to.be.a.string;
	});

});
