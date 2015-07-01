'use strict';

var kruskal = require( './../lib' );

var x, y, z,
	out,
	table;

// data from Hollander & Wolfe (1973), 116.
x = [2.9, 3.0, 2.5, 2.6, 3.2];
y = [3.8, 2.7, 4.0, 2.4];
z = [2.8, 3.4, 3.7, 2.2, 2.0];

out = kruskal( x, y, z );
console.log( 'Output object: ' );
console.dir( out );
console.log( '\n' );

table = out.toString();

console.log( table );
