var data = [ { sample: 'S1', gene: 'BRAF', genotype: { type: 'MUT', data: 'V600E' } }, 
             { sample: 'S1', gene: 'TP53', genotype: { type: 'MUT', data: 'F212fs' } }, 
             { sample: 'S2', gene: 'TP53', genotype: { type: 'CNA', data: 'HOMDEL' } }, 
             { sample: 'S3', gene: 'TP53', genotype: { type: 'CNA', data: 'HETLOSS' } }, 
             { sample: 'S3', gene: 'KRAS', genotype: { type: 'MUT', data: 'G12D' } }, 
             { sample: 'S4', gene: 'EGFR', genotype: { type: 'CNA', data: 'AMP' } }, 
             { sample: 'S4', gene: 'EGFR', genotype: { type: 'MUT', data: 'S45T' } },
             { sample: 'S4', gene: 'TP53', genotype: { type: 'EXP', data: -2.2 } },
             { sample: 'S5', gene: 'TP53', genotype: { type: 'MUT', data: 'G34M' } }, 
             { sample: 'S5', gene: 'BRAF', genotype: { type: 'MUT', data: 'R100T' } } ];

function Query( terms ) {
    this.multiple = false;

    if (terms) {
        this.terms = terms;
        if (this.terms.length > 1) 
            this.multiple = true;
    }
    else {
        this.terms = [];
    }

    this.add = function( attribute, query, comparator ) {
        this.terms.push([attribute, query, comparator]);
        if (! this.multiple && this.terms.length > 1)
            this.multiple = true;
    };
    
    check_term = function( term, sample ) {
        var attribute = (term[0].length == 2) ? sample[term[0][0]][term[0][1]] : sample[term[0]];
        var query = term[1];
        var compare = term[2];
        return compare( attribute, query );
    }
    
    this.check = function( sample ) {
        if (this.multiple) {
            return this.terms.reduce(function( a, b ) {
                if (typeof a == "boolean")
                    return a && this.check_term( b, sample );
                else
                    return check_term( a, sample ) && this.check_term( b, sample );
            });
        }
        else {
            var term = this.terms[0];
            return check_term( term, sample );
        }
    };
};

function eq( a, b ) { return a == b; };
function lt( a, b ) { return a < b; };
function leq( a, b ) { return a <= b; };
function gt( a, b ) { return a > b; };
function geq( a, b ) { return a >= b; };

function check_sample( queries, sample ) {
    if (queries.length > 1) {
        return queries.reduce(function(a, b) {
            if (typeof a == "boolean")
                return a || b.check( sample );
            else
                return a.check( sample ) || b.check( sample );
        });
    }
    else {
        var query = queries[0];
        return query.check( sample );
    }
}

function get_result( expressions ) {
    return data.filter(function( sample ) {
        if (expressions.length == 1) {
            var queries = expressions[0];
            return check_sample( queries, sample );
        }
        else {
            return expressions.reduce(function(a, b) {
                if (typeof a == "boolean")
                    return a || check_sample( b, sample );
                else
                    return check_sample( a, sample ) || check_sample( b, sample );
            });
        }
    });
};
