var data = [ { sample: 'S1', gene: 'BRAF', genotype: { type: 'MUT', data: 'V600E' } }, 
             { sample: 'S1', gene: 'TP53', genotype: { type: 'MUT', data: 'F212fs' } }, 
             { sample: 'S2', gene: 'TP53', genotype: { type: 'CNA', data: 'HOMDEL' } }, 
             { sample: 'S3', gene: 'TP53', genotype: { type: 'CNA', data: 'HETLOSS' } }, 
             { sample: 'S3', gene: 'KRAS', genotype: { type: 'MUT', data: 'G12D' } }, 
             { sample: 'S3', gene: 'KRAS', genotype: { type: 'MUT', data: 'NONSTOP' } }, 
             { sample: 'S4', gene: 'EGFR', genotype: { type: 'CNA', data: 'AMP' } }, 
             { sample: 'S4', gene: 'EGFR', genotype: { type: 'MUT', data: 'S45T' } },
             { sample: 'S4', gene: 'TP53', genotype: { type: 'EXP', data: -2.2 } },
             { sample: 'S4', gene: 'TP53', genotype: { type: 'PROT', data: -2.2 } },
             { sample: 'S5', gene: 'TP53', genotype: { type: 'MUT', data: 'G34M' } }, 
             { sample: 'S5', gene: 'BRAF', genotype: { type: 'MUT', data: 'R100T' } } ];

/**
 * Creates a Query object.
 *
 * @constructor
 * @this {Query}
 * @param {list} expressions The expressions that make up the query.
 */
function Query( expressions ) {    
  this.expressions = expressions;
  
  check_term = function( term, sample ) {
    var selector = term[0];
    var attribute = (selector.length == 2) ? 
                    sample[selector[0]][selector[1]] : sample[selector];
    var query = term[1];
    var compare = term[2];
    return compare( attribute, query );
  }
  

  this.is_match = function( expression, sample ) {
    if (expression.length > 1) {
      return expression.reduce(function( term_a, term_b ) {
        return term_a && check_term( term_b, sample );
      }, true);
    }
    else {
      var term = expression[0];
      return check_term( term, sample );
    }
  };
};

/**
 * Searches a set based on a query.
 *
 * @param {Query} query The query.
 * @param {list} set The set of items to search.
 * @return {list} Returns a subset of the set that matches the query.
 */
function search( query, set ) {
  return data.filter(function( sample ) {
    if (query.expressions.length > 1) {
      return query.expressions.reduce(function( expression_a, expression_b ) {
        return expression_a || query.is_match( expression_b, sample );
      }, false);
    }
    else {
      var expression = query.expressions[0];
      return query.is_match( expression, sample );
    }
  });
}

function eq( a, b ) { return a == b; };
function lt( a, b ) { return a < b; };
function leq( a, b ) { return a <= b; };
function gt( a, b ) { return a > b; };
function geq( a, b ) { return a >= b; };
