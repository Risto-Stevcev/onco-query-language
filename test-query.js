/* * * * * * * * * * * *
 * Query Object Tests  *
 * * * * * * * * * * * */
function test_query( name, expected, result ) {
    test( name, function() {
        deepEqual(  expected, result  );
    });
}


// TP53
expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}},
            {"sample":"S3","gene":"TP53","genotype":{"type":"CNA","data":"HETLOSS"}},
            {"sample":"S4","gene":"TP53","genotype":{"type":"EXP","data":-2.2}},
            {"sample":"S4","gene":"TP53","genotype":{"type":"PROT","data":-2.2}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
query = new Query( [[['gene', 'TP53', eq]]] );
test_query( 'TP53', expected, search( query, data ) );


// TP53: MUT
expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
query = new Query( [[['gene', 'TP53', eq], [['genotype','type'], 'MUT', eq]]] );
test_query( 'TP53: MUT', expected, search( query, data ) );


// TP53: HOMDEL
expected = [{"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}}];
query = new Query( [[['gene', 'TP53', eq], [['genotype','data'], 'HOMDEL', eq]]] );
test_query( 'TP53: HOMDEL', expected, search( query, data ) );


// BRAF: MUT=V600E
expected = [{"sample":"S1","gene":"BRAF","genotype":{"type":"MUT","data":"V600E"}}];
query = new Query( [[['gene', 'BRAF', eq], [['genotype','type'], 'MUT', eq],
                                           [['genotype','data'], 'V600E', eq]]] );
test_query( 'BRAF: MUT=V600E', expected, search( query, data ) );


// TP53: EXP<­-2
expected = [{"sample":"S4","gene":"TP53","genotype":{"type":"EXP","data":-2.2}}];
query = new Query( [[['gene', 'TP53', eq], [['genotype','type'], 'EXP', eq],
                                           [['genotype','data'], -2, lt]]] );
test_query( 'TP53: EXP<-2', expected, search( query, data ) );


// TP53: MUT HOMDEL
expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
query = new Query( [[['gene', 'TP53', eq], [['genotype','type'], 'MUT', eq]],
                    [['gene', 'TP53', eq], [['genotype','data'], 'HOMDEL', eq]]] );
test_query( 'TP53: MUT HOMDEL', expected, search( query, data ) );


// TP53: MUT HOMDEL EXP<­-2
expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}},
            {"sample":"S4","gene":"TP53","genotype":{"type":"EXP","data":-2.2}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
query = new Query( [[['gene', 'TP53', eq], [['genotype','type'], 'MUT', eq]],
                    [['gene', 'TP53', eq], [['genotype','data'], 'HOMDEL', eq]],
                    [['gene', 'TP53', eq], [['genotype','type'], 'EXP', eq],
                                           [['genotype','data'], -2, lt]]] );
test_query( 'TP53: MUT HOMDEL EXP<-2', expected, search( query, data ) );


// TP53: MUT; BRAF: MUT
expected = [{"sample":"S1","gene":"BRAF","genotype":{"type":"MUT","data":"V600E"}},
            {"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}},
            {"sample":"S5","gene":"BRAF","genotype":{"type":"MUT","data":"R100T"}}];
query = new Query( [[['gene', 'TP53', eq], [['genotype','type'], 'MUT', eq]],
                    [['gene', 'BRAF', eq], [['genotype','type'], 'MUT', eq]]] );
test_query( 'TP53: MUT; BRAF: MUT', expected, search( query, data ) );
