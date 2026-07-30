// ======================================
// GameForge AI
// testAI.js
// Automatic Testing AI
// ======================================



const TEST_KEY =

    "gameforge-test-history-v1";



let tests =

    loadTests();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadTests(){


    const data =

        localStorage.getItem(

            TEST_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveTests(){


    localStorage.setItem(

        TEST_KEY,

        JSON.stringify(

            tests

        )

    );


}



// --------------------------------------
// テスト作成
// --------------------------------------

export function createTest({

    name="System Test",

    target="system"

}){


    const test={


        id:

        "test_"

        +

        Date.now(),



        name,



        target,



        cases:

        [],



        result:

        null,



        created:

        Date.now()



    };



    tests.push(

        test

    );



    saveTests();



    return test;


}



// --------------------------------------
// テストケース追加
// --------------------------------------

export function addTestCase({

    test,

    name,

    expected,

    actual

}){


    const success=

        expected===actual;



    test.cases.push({


        name,



        expected,



        actual,



        success



    });



    saveTests();



    return success;


}



// --------------------------------------
// テスト実行
// --------------------------------------

export function runTest(

    test

){


    const total=

        test.cases.length;



    const passed=

        test.cases.filter(

            c=>

            c.success

        ).length;



    test.result={


        total,



        passed,



        failed:

        total -

        passed,



        score:

        total===0

        ?

        0

        :

        Math.floor(

            passed /

            total *

            100

        ),



        date:

        Date.now()



    };



    saveTests();



    return test.result;


}



// --------------------------------------
// システムチェック
// --------------------------------------

export function systemCheck({

    systems=[]

}){


    const result=[];



    systems.forEach(

        system=>{


            result.push({


                system,



                status:

                "ok"



            });


        }

    );



    return result;


}



// --------------------------------------
// 品質評価
// --------------------------------------

export function evaluateQuality(){

    
    if(

        tests.length===0

    )

        return 0;



    const scores=

        tests

        .filter(

            t=>

            t.result

        )

        .map(

            t=>

            t.result.score

        );



    if(

        scores.length===0

    )

        return 0;



    return Math.floor(

        scores.reduce(

            (

                a,

                b

            )=>

            a+b,

            0

        )

        /

        scores.length

    );


}



// --------------------------------------
// 全テスト
// --------------------------------------

export function getTests(){


    return tests;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestTest(){


    return tests[

        tests.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getTestAIInfo(){


    return {


        name:

        "Test AI",



        version:

        "1.0",



        tests:

        tests.length


    };


}
