'use strict';

// MODULES //

var isArrayLike = require( 'validate.io-array-like' ),
	rank = require( 'compute-rank' ),
	sum = require( 'compute-sum' ),
	divide = require( 'compute-divide' ),
	power = require( 'compute-power' ),
	roundn = require( 'compute-roundn' ),
	chisqCDF = require( 'jStat' ).jStat.chisquare.cdf;


// KRUSKAL-WALLIS TEST //

/**
* FUNCTION: kruskal()
*	Computes the Kruskal-Wallis test for equality of medians.
*
* @param {} arguments - either two or more number arrays
* @returns {Object} result object with properties `K`, `df` and `pValue`, holding the calculated test statistic, the degrees of freedom of the test and the p-value.
*/

function kruskal() {

	var ngroups = arguments.length,
		groupRankSums = new Array( ngroups ),
		groupsIndicators = [],
		i, j,
		arg,
		n = [], N,
		x = [],
		ranks, ties, tieSumTerm,
		key, s,
		stat, param, pval;

	if ( ngroups < 2 ) {
		throw new Error( 'kruskal()::invalid number of input arguments. Must provide at least two array-like arguments. Value: `' + arg + '`.' );
	}

	for ( i = 0; i < ngroups; i++ ) {
		arg = arguments[ i ];
		if ( !isArrayLike( arg ) ) {
				throw new TypeError( 'kruskal()::invalid input argument. Must provide array-like arguments. Value: `' + arg + '`.' );
		}
		if ( arg.length === 0 ) {
			throw new Error( 'kruskal()::invalid input argumebt. Supplied arrays cannot be empty. Value: `' + arg + '`.' );
		} else {
			n[ i ] = arg.length;
		}

		groupRankSums[ i ] = 0;

		for ( j = 0; j < n[ i ]; j++ ) {
			groupsIndicators.push( i );
			x.push( arg[ j ] );
		}
	}

	N = x.length;
	ranks = rank( x );

	// calculate # ties for each value & rank sums per group
	ties = {};

	for ( i = 0; i < N; i++ ) {
		groupRankSums[ groupsIndicators[ i ] ] += ranks[ i ];
		if ( x[ i ] in ties ) {
			ties[ x[ i ] ] += 1;
		} else {
			ties[ x[ i ] ] = 1;
		}
	}

	// calculate test statistic using short-cut formula
	stat = sum( divide( power( groupRankSums, 2), n ) );
	stat = ( 12 / (N * (N+1) ) ) * stat - 3 * ( N + 1 );

	// correction for ties
	tieSumTerm = 0;
	for ( key in ties ) {
		/*jshint -W089 */
		tieSumTerm += Math.pow( ties[ key ], 3 ) - ties[ key ];
	}

	stat /= 1 - ( tieSumTerm ) / ( Math.pow( N, 3 ) - N );
	param = ngroups - 1;
	pval = 1 - chisqCDF( stat, param );

	return {
		'H': stat,
		'df': param,
		'pValue': pval,
		'toString': function() {
			s = 'Kruskal-Wallis rank sum test.\n';
			s += '\tnull hypothesis: the medians of all groups are the same.\n';
			s += '\ttest statistic: ' + roundn( stat, -4 ) + '\n';
			s += '\tdf: ' +  param + '\n';
			s += '\tp-value: ' + roundn( pval, -4 );
			s += '\n';
			return s;
		}
	};

} // end FUNCTION kruskal()


// EXPORTS //

module.exports = kruskal;
