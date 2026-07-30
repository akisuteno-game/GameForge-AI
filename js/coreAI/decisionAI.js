// ======================================
// GameForge AI
// decisionAI.js
// Decision Making AI
// ======================================



const DECISION_KEY =

    "gameforge-decision-history-v1";



let decisions =

    loadDecisions();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadDecisions(){


    const data =

        localStorage.getItem(

            DECISION_KEY

        );



    return data

        ? JSON.parse(

            data

        )

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveDecisions(){


    localStorage.setItem(

        DECISION_KEY,

        JSON.stringify(

            decisions

        )

    );


}



// --------------------------------------
// 判断作成
// --------------------------------------

export function makeDecision({

    situation,

    options=[]

}){


    const decision={


        id:

        "decision_"

        +

        Date.now(),



        situation,



        options,



        selected:

        selectBestOption(

            options

        ),



        confidence:

        calculateConfidence(

            options

        ),



        created:

        Date.now()



    };



    decisions.push(

        decision

    );



    saveDecisions();



    return decision;


}



// --------------------------------------
// 最適選択
// --------------------------------------

function selectBestOption(

    options

){


    if(

        options.length===0

    )

        return null;



    let best=

        options[0];



    options.forEach(

        option=>{


            if(

                option.score >

                best.score

            ){


                best=

                option;


            }


        }

    );



    return best;


}



// --------------------------------------
// 信頼度計算
// --------------------------------------

function calculateConfidence(

    options

){


    if(

        options.length===0

    )

        return 0;



    const scores=

        options.map(

            o=>

            o.score || 0

        );



    const max=

        Math.max(

            ...scores

        );



    const total=

        scores.reduce(

            (

                a,

                b

            )=>

            a+b,

            0

        );



    if(

        total===0

    )

        return 0;



    return Math.floor(

        max /

        total *

        100

    );


}



// --------------------------------------
// 優先順位設定
// --------------------------------------

export function rankPriority({

    tasks=[]

}){


    return tasks.sort(

        (

            a,

            b

        )=>

        b.priority -

        a.priority

    );


}



// --------------------------------------
// リスク判断
// --------------------------------------

export function analyzeRisk({

    value,

    limit

}){


    return {


        value,



        limit,



        risk:

        value > limit

        ?

        "high"

        :

        "low"



    };


}



// --------------------------------------
// 未来予測
// --------------------------------------

export function predict({

    current,

    growth

}){


    return {


        current,



        future:

        current +

        growth,



        prediction:

        "estimated"



    };


}



// --------------------------------------
// 判断履歴
// --------------------------------------

export function getDecisions(){


    return decisions;


}



// --------------------------------------
// 最新判断
// --------------------------------------

export function getLatestDecision(){


    return decisions[

        decisions.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getDecisionAIInfo(){


    return {


        name:

        "Decision AI",



        version:

        "1.0",



        decisions:

        decisions.length


    };


}
