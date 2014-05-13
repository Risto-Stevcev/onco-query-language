
/* Onco Query Language */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */
"AMP"                 return 'AMP'
[A-Z0-9]+             return 'GENE'
":"                   return ':'
";"                   return ';'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex

/* operator associations and precedence */
/* N/A */

%start statement

%% /* language grammar */

statement
    : gene-expressions EOF
        { var result = get_result( [ $1 ] );
          typeof console !== 'undefined' ? console.log( result ) : print( result );
          return result; }
    ;

gene-expressions
    : gene-expression
        { $$ = [ new Query( $1 ) ]; }
    | gene-expressions ';' gene-expression
        { $1.push( new Query( $3 )); 
          $$ = $1; }
    ;

gene-expression
    : GENE ':' expression
        { $$ = [['gene', $1, eq], $3]; } 
    | GENE
        { $$ = [['gene', $1, eq]]; }

    ;

expression
    : AMP
        { $$ = [['genotype', 'data'], 'AMP', eq]; }
    ;
