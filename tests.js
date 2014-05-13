/* * * * * * *
 *   Tests   *
 * * * * * * */
function test_query( name, expected, result ) {
    test( name, function() {
        deepEqual(  expected, result  );
    });
}

query = new Query();
query2 = new Query();
query3 = new Query();
var expected = [];


// TP53
query.terms = [];
query.add( 'gene', 'TP53', eq );

expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},{"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}},{"sample":"S3","gene":"TP53","genotype":{"type":"CNA","data":"HETLOSS"}},{"sample":"S4","gene":"TP53","genotype":{"type":"EXP","data":-2.2}},{"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
test_query( 'TP53', expected, get_result( [[query]] ) );


// TP53: MUT
query.terms = [];
query.add( 'gene', 'TP53', eq );
query.add( ['genotype','type'], 'MUT', eq );

expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},{"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
test_query( 'TP53: MUT', expected, get_result( [[query]] ) );


// TP53: HOMDEL
query.terms = [];
query.add( 'gene', 'TP53', eq );
query.add( ['genotype','data'], 'HOMDEL', eq );

expected = [{"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}}];
test_query( 'TP53: HOMDEL', expected, get_result( [[query]] ) );


// BRAF: MUT=V600E
query.terms = [];
query.add( 'gene', 'BRAF', eq );
query.add( ['genotype','type'], 'MUT', eq );
query.add( ['genotype','data'], 'V600E', eq );

expected = [{"sample":"S1","gene":"BRAF","genotype":{"type":"MUT","data":"V600E"}}];
test_query( 'BRAF: MUT=V600E', expected, get_result( [[query]] ) );


// TP53: EXP<­-2
query.terms = [];
query.add( 'gene', 'TP53', eq );
query.add( ['genotype','type'], 'EXP', eq );
query.add( ['genotype','data'], -2, lt );

expected = [{"sample":"S4","gene":"TP53","genotype":{"type":"EXP","data":-2.2}}];
test_query( 'TP53: EXP<-2', expected, get_result( [[query]] ) );


// TP53: MUT HOMDEL
query.terms = [];
query.add( 'gene', 'TP53', eq );
query.add( ['genotype','type'], 'MUT', eq );
query2.terms = [];
query2.add( 'gene', 'TP53', eq );
query2.add( ['genotype','data'], 'HOMDEL', eq );

expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},{"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}},{"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
test_query( 'TP53: MUT HOMDEL', expected, get_result( [[query, query2]] ) );


// TP53: MUT HOMDEL EXP<­-2
query.terms = [];
query.add( 'gene', 'TP53', eq );
query.add( ['genotype','type'], 'MUT', eq );
query2.terms = [];
query2.add( 'gene', 'TP53', eq );
query2.add( ['genotype','data'], 'HOMDEL', eq );
query3.terms = [];
query3.add( 'gene', 'TP53', eq );
query3.add( ['genotype','type'], 'EXP', eq );
query3.add( ['genotype','data'], -2, lt );

expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},{"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}},{"sample":"S4","gene":"TP53","genotype":{"type":"EXP","data":-2.2}},{"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
test_query( 'TP53: MUT HOMDEL EXP<-2', expected, get_result( [[query, query2, query3]] ) );


// TP53: MUT; BRAF: MUT
query.terms = [];
query.add( 'gene', 'TP53', eq );
query.add( ['genotype','type'], 'MUT', eq );
query2.terms = [];
query2.add( 'gene', 'BRAF', eq );
query2.add( ['genotype','type'], 'MUT', eq );

expected = [{"sample":"S1","gene":"BRAF","genotype":{"type":"MUT","data":"V600E"}},{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},{"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}},{"sample":"S5","gene":"BRAF","genotype":{"type":"MUT","data":"R100T"}}];
test_query( 'TP53: MUT; BRAF: MUT', expected, get_result( [[query],[query2]] ) );
