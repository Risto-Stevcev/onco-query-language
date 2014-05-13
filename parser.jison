
/* Onco Query Language */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"CNA"                 return 'CNA'
"AMP"                 return 'AMP'
"HOMDEL"              return 'HOMDEL'
"GAIN"                return 'GAIN'
"HETLOSS"             return 'HETLOSS'
"MUT"                 return 'MUT'
"MUTATED"             return 'MUTATED'
"MISSENSE"            return 'MISSENSE'
"NONSENSE"            return 'NONSENSE'
"NONSTART"            return 'NONSTART'
"NONSTOP"             return 'NONSTOP'
"FRAMESHIFT"          return 'FRAMESHIFT'
"INFRAME"             return 'INFRAME'
"SPLICE"              return 'SPLICE'
"TRUNC"               return 'TRUNC'
"EXP"                 return 'EXP'
"PROT"                return 'PROT'
"DATATYPES"           return 'DATATYPES'
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
[a-zA-Z0-9]+          return 'GENE'
">="                  return '>='
"<="                  return '<='
">"                   return '>'
"<"                   return '<'
"="                   return '='
"-"                   return '-'
":"                   return ':'
";"                   return ';'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

%start statement

%% /* language grammar */

statement
    : gene-expressions EOF
        { return search( new Query( $1 ), data ); }
    | datatypes-expression EOF
        { return search( new Query( $1 ), data ); }
    ;

datatypes-expression
    : 'DATATYPES' ':' expressions ';' genes
        { $$ = $5.map( function(gene) {
            return [ gene, $3[0] ];           
          }); } 
    ;

genes
    : genes 'GENE'
        { $1.push( ['gene', $2, eq] );
          $$ = $1; }
    | 'GENE'
        { $$ = [['gene', $1, eq]]; }
    ;

gene-expressions
    : gene-expression
        { $$ = $1; }
    | gene-expressions ';' gene-expression
        { $$ = $1.concat($3); }
    ;

gene-expression
    : 'GENE' ':' expressions
        { $$ = $3.map( function(term) {
            if (JSON.stringify(term[0][0]) == JSON.stringify(["genotype","type"])) {
                term.push(['gene', $1, eq]);
                return term;
            }
            else {
                return [['gene', $1, eq], term];
            }
          }); }
    | 'GENE'
        { $$ = [[['gene', $1, eq]]]; }
    ;

expressions
    : expression
        { $$ = $1; }
    | expressions simple-expression
        { $1.push( $2 );
          $$ = $1; }
    | expressions compound-expression
        { $1.push( $2 );
          $$ = $1; }
    ;

expression
    : compound-expression
        { $$ = $1; }
    | simple-expression
        { $$ = [ $1 ]; }
    ;

simple-expression
    : copy-number-alterations
        { $$ = $1; }
    | mutations
        { $$ = $1; }
    | mrna-expression
        { $$ = $1; }
    | protein-level
        { $$ = $1; }
    ;

compound-expression
    : 'CNA' '>=' 'GAIN'
        { $$ = [ [['genotype', 'data'], 'GAIN', eq],
                 [['genotype', 'data'], 'AMP', eq] ]; }
    ;

copy-number-alterations
    : 'AMP'
        { $$ = [['genotype', 'data'], 'AMP', eq]; }
    | 'HOMDEL'
        { $$ = [['genotype', 'data'], 'HOMDEL', eq]; }
    | 'GAIN'
        { $$ = [['genotype', 'data'], 'GAIN', eq]; }
    | 'HETLOSS'
        { $$ = [['genotype', 'data'], 'HETLOSS', eq]; }
    ;

mutations
    : 'MUT'
        { $$ = [['genotype', 'type'], 'MUT', eq]; }
    | 'MUTATED'
        { $$ = [['genotype', 'type'], 'MUT', eq]; }
    | 'MUT' '=' 'GENE'
        { $$ = [['genotype', 'data'], $3, eq]; }
    | 'MUT' '=' mutation-types
        { $$ = [['genotype', 'data'], $3, eq]; }
    ;

mutation-types
    : 'MISSENSE'
        { $$ = $1; }
    | 'NONSENSE'
        { $$ = $1; }
    | 'NONSTART'
        { $$ = $1; }
    | 'NONSTOP'
        { $$ = $1; }
    | 'FRAMESHIFT'
        { $$ = $1; }
    | 'INFRAME'
        { $$ = $1; }
    | 'SPLICE'
        { $$ = $1; }
    | 'TRUNC'
        { $$ = $1; }
    ;

mrna-expression
    : 'EXP' '>' 'NUMBER'
        { $$ = [ [['genotype', 'type'], $1, eq],
                 [['genotype', 'data'], $3, gt] ]; }
    | 'EXP' '>=' 'NUMBER'
        { $$ = [ [['genotype', 'type'], $1, eq],
                 [['genotype', 'data'], $3, geq] ]; }
    | 'EXP' '<' '-' 'NUMBER'
        { $$ = [ [['genotype', 'type'], $1, eq],
                 [['genotype', 'data'], (-1)*$4, lt] ]; }
    | 'EXP' '<=' '-' 'NUMBER'
        { $$ = [ [['genotype', 'type'], $1, eq],
                 [['genotype', 'data'], (-1)*$4, leq] ]; }
    ;

protein-level
    : 'PROT' '>' 'NUMBER'
        { $$ = [ [['genotype', 'type'], $1, eq],
                 [['genotype', 'data'], $3, gt] ]; }
    | 'PROT' '>=' 'NUMBER'
        { $$ = [ [['genotype', 'type'], $1, eq],
                 [['genotype', 'data'], $3, geq] ]; }
    | 'PROT' '<' '-' 'NUMBER'
        { $$ = [ [['genotype', 'type'], $1, eq],
                 [['genotype', 'data'], (-1)*$4, lt] ]; }
    | 'PROT' '<=' '-' 'NUMBER'
        { $$ = [ [['genotype', 'type'], $1, eq],
                 [['genotype', 'data'], (-1)*$4, leq] ]; }
    ;
