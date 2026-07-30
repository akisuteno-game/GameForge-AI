// ======================================
// GameForge AI
// improvementAI.js
// Self Improvement Planning AI
// ======================================



const IMPROVEMENT_KEY =

    "gameforge-improvement-history-v1";



let improvements =

    loadImprovements();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadImprovements(){


    const data =

        localStorage.getItem(

            IMPROVEMENT_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveImprovements(){


    localStorage.setItem(

        IMPROVEMENT_KEY,

        JSON.stringify(

            improvements

        )

    );


}



// --------------------------------------
// 改善案作成
// --------------------------------------

export function createImprovement({

    category="system",

    problem="",

    data={}

}){


    const improvement={


        id:

        "improve_"

        +

        Date.now(),



        category,



        problem,



        data,



        priority:

        calculatePriority(

            category,

            data

        ),



        status:

        "waiting",



        created:

        Date.now()



    };



    improvements.push(

        improvement

    );



    saveImprovements();



    return improvement;


}



// --------------------------------------
// 優先度計算
// --------------------------------------

function calculatePriority(

    category,

    data

){


    let score=0;



    if(

        category==="bug"

    ){


        score+=50;


    }



    if(

        category==="balance"

    ){


        score+=30;


    }



    if(

        category==="ui"

    ){


        score+=20;


    }



    if(

        data.count

    ){


        score +=

        data.count * 5;


    }



    if(

        score>=70

    ){


        return "high";


    }



    if(

        score>=40

    ){


        return "normal";


    }



    return "low";


}



// --------------------------------------
// 自動改善生成
// --------------------------------------

export function generateAutoImprovements(

    feedbackData

){


    const result=[];



    Object.keys(

        feedbackData

    ).forEach(

        category=>{


            const count=

                feedbackData[category];



            if(

                count>0

            ){


                result.push(

                    createImprovement({


                        category,



                        problem:

                        `${category}問題を検出`,



                        data:

                        {

                            count

                        }



                    })

                );


            }


        }

    );



    return result;


}



// --------------------------------------
// 改善実行
// --------------------------------------

export function completeImprovement(

    id

){


    const item=

        improvements.find(

            i=>

            i.id===id

        );



    if(!item)

        return null;



    item.status=

        "complete";



    item.completed=

        Date.now();



    saveImprovements();



    return item;


}



// --------------------------------------
// 改善評価
// --------------------------------------

export function evaluateImprovement({

    before,

    after

}){


    return {


        difference:

        after -

        before,



        improved:

        after > before



    };


}



// --------------------------------------
// 優先リスト
// --------------------------------------

export function getPriorityList(){


    return improvements.sort(

        (

            a,

            b

        )=>

        priorityValue(

            b.priority

        )

        -

        priorityValue(

            a.priority

        )

    );


}



// --------------------------------------
// 優先度数値化
// --------------------------------------

function priorityValue(

    value

){


    return {


        high:3,

        normal:2,

        low:1



    }[value] || 0;


}



// --------------------------------------
// 全改善
// --------------------------------------

export function getImprovements(){


    return improvements;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestImprovement(){


    return improvements[

        improvements.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getImprovementAIInfo(){


    return {


        name:

        "Improvement AI",



        version:

        "1.0",



        improvements:

        improvements.length


    };


}
