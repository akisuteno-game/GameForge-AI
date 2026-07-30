// ======================================
// GameForge AI
// performanceAI.js
// Performance Testing AI
// ======================================



const PERFORMANCE_KEY =

    "gameforge-performance-history-v1";



let performances =

    loadPerformance();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadPerformance(){


    const data =

        localStorage.getItem(

            PERFORMANCE_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function savePerformance(){


    localStorage.setItem(

        PERFORMANCE_KEY,

        JSON.stringify(

            performances

        )

    );


}



// --------------------------------------
// 計測作成
// --------------------------------------

export function createPerformanceTest({

    name="Performance Test"

}){


    const test={


        id:

        "performance_"

        +

        Date.now(),



        name,



        fps:

        0,



        loadTime:

        0,



        memory:

        0,



        problems:

        [],



        created:

        Date.now()



    };



    performances.push(

        test

    );



    savePerformance();



    return test;


}



// --------------------------------------
// FPS分析
// --------------------------------------

export function analyzeFPS(

    fps

){


    let status=

        "good";



    if(

        fps < 30

    ){


        status=

        "bad";


    }

    else if(

        fps < 60

    ){


        status=

        "normal";


    }



    return {


        fps,



        status



    };


}



// --------------------------------------
// ロード時間分析
// --------------------------------------

export function analyzeLoadTime(

    milliseconds

){


    let status=

        "good";



    if(

        milliseconds > 3000

    ){


        status=

        "bad";


    }

    else if(

        milliseconds > 1000

    ){


        status=

        "normal";


    }



    return {


        time:

        milliseconds,



        status



    };


}



// --------------------------------------
// メモリ分析
// --------------------------------------

export function analyzeMemory(

    usage

){


    return {


        usage,



        status:

        usage > 500

        ?

        "warning"

        :

        "good"



    };


}



// --------------------------------------
// 問題検出
// --------------------------------------

export function detectPerformanceProblem({

    fps,

    loadTime,

    memory

}){


    const problems=[];



    if(

        fps < 30

    ){


        problems.push(

            "FPS低下"

        );


    }



    if(

        loadTime > 3000

    ){


        problems.push(

            "ロード時間過多"

        );


    }



    if(

        memory > 500

    ){


        problems.push(

            "メモリ使用量過多"

        );


    }



    return problems;


}



// --------------------------------------
// 改善案
// --------------------------------------

export function createOptimizationSuggestion(

    problems

){


    const result=[];



    problems.forEach(

        problem=>{


            if(

                problem==="FPS低下"

            ){


                result.push(

                    "描画処理を軽量化"

                );


            }



            if(

                problem==="ロード時間過多"

            ){


                result.push(

                    "素材読み込みを最適化"

                );


            }



            if(

                problem==="メモリ使用量過多"

            ){


                result.push(

                    "不要データを解放"

                );


            }


        }

    );



    return result;


}



// --------------------------------------
// スコア計算
// --------------------------------------

export function calculatePerformanceScore({

    fps,

    loadTime,

    memory

}){


    let score=100;



    if(

        fps < 60

    )

        score-=20;



    if(

        loadTime > 1000

    )

        score-=20;



    if(

        memory > 500

    )

        score-=20;



    return Math.max(

        0,

        score

    );


}



// --------------------------------------
// 全履歴
// --------------------------------------

export function getPerformanceTests(){


    return performances;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestPerformance(){


    return performances[

        performances.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getPerformanceAIInfo(){


    return {


        name:

        "Performance AI",



        version:

        "1.0",



        tests:

        performances.length


    };


}
