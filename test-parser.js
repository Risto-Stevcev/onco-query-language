/* * * * * * * * *
 * Parser Tests  *
 * * * * * * * * */
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
test_query( 'TP53', expected, parser.parse( 'TP53' ) );


// TP53: MUT
expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
test_query( 'TP53: MUT', expected, parser.parse( 'TP53: MUT' ) );


// TP53: HOMDEL
expected = [{"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}}];
test_query( 'TP53: HOMDEL', expected, parser.parse( 'TP53: HOMDEL' ) );


// BRAF: MUT=V600E
expected = [{"sample":"S1","gene":"BRAF","genotype":{"type":"MUT","data":"V600E"}}];
test_query( 'BRAF: MUT=V600E', expected, parser.parse( 'BRAF: MUT=V600E' ) );


// TP53: EXP<­-2
expected = [{"sample":"S4","gene":"TP53","genotype":{"type":"EXP","data":-2.2}}];
test_query( 'TP53: EXP<-2', expected, parser.parse( 'TP53: EXP<-2' ) );


// TP53: MUT HOMDEL
expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
test_query( 'TP53: MUT HOMDEL', expected, parser.parse( 'TP53: MUT HOMDEL' ) );


// TP53: MUT HOMDEL EXP<­-2
expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}},
            {"sample":"S4","gene":"TP53","genotype":{"type":"EXP","data":-2.2}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}];
test_query( 'TP53: MUT HOMDEL EXP<-2', expected, parser.parse( 'TP53: MUT HOMDEL EXP<-2' ) );


// TP53: MUT; BRAF: MUT
expected = [{"sample":"S1","gene":"BRAF","genotype":{"type":"MUT","data":"V600E"}},
            {"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}},
            {"sample":"S5","gene":"BRAF","genotype":{"type":"MUT","data":"R100T"}}];
test_query( 'TP53: MUT; BRAF: MUT', expected, parser.parse( 'TP53: MUT; BRAF: MUT' ) );


// TP53: HETLOSS HOMDEL
expected = [{"sample":"S2","gene":"TP53","genotype":{"type":"CNA","data":"HOMDEL"}},
            {"sample":"S3","gene":"TP53","genotype":{"type":"CNA","data":"HETLOSS"}}];
test_query( 'TP53: HETLOSS HOMDEL', expected, parser.parse( 'TP53: HETLOSS HOMDEL' ) );


// EGFR: CNA >= GAIN
expected = [{"sample":"S4","gene":"EGFR","genotype":{"type":"CNA","data":"AMP"}}];
test_query( 'EGFR: CNA >= GAIN', expected, parser.parse( 'EGFR: CNA >= GAIN' ) );


// EGFR: GAIN AMP
test_query( 'EGFR: GAIN AMP', expected, parser.parse( 'EGFR: GAIN AMP' ) );


// KRAS: MUT
expected = [{"sample":"S3","gene":"KRAS","genotype":{"type":"MUT","data":"G12D"}},
            {"sample":"S3","gene":"KRAS","genotype":{"type":"MUT","data":"NONSTOP"}}];
test_query( 'KRAS: MUT', expected, parser.parse( 'KRAS: MUT' ) );


// KRAS: MUT = NONSTOP
expected = [{"sample":"S3","gene":"KRAS","genotype":{"type":"MUT","data":"NONSTOP"}}];
test_query( 'KRAS: MUT = NONSTOP', expected, parser.parse( 'KRAS: MUT = NONSTOP' ) );


// TP53: MUT = F212fs MUT = G34M 
expected = [{"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}}]
test_query( 'TP53: MUT = F212fs MUT = G34M', expected, parser.parse( 'TP53: MUT = F212fs MUT = G34M' ) );


// DATATYPES: MUT; TP53 BRAF 
expected = [{"sample":"S1","gene":"BRAF","genotype":{"type":"MUT","data":"V600E"}},
            {"sample":"S1","gene":"TP53","genotype":{"type":"MUT","data":"F212fs"}},
            {"sample":"S5","gene":"TP53","genotype":{"type":"MUT","data":"G34M"}},
            {"sample":"S5","gene":"BRAF","genotype":{"type":"MUT","data":"R100T"}}]
test_query( 'DATATYPES: MUT; TP53 BRAF', expected, parser.parse( 'DATATYPES: MUT; TP53 BRAF' ) );


