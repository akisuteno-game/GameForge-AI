// ======================================
// GameForge AI
// feedbackAI.js
// Player Feedback Analysis AI
// ======================================



const FEEDBACK_KEY =

    "gameforge-feedback-history-v1";



let feedbacks =

    loadFeedbacks();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadFeedbacks(){


    const data =

        localStorage.getItem(

            FEEDBACK_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveFeedbacks(){


    localStorage.setItem(

        FEEDBACK_KEY,

        JSON.stringify(

            feedbacks

        )

    );


}



// --------------------------------------
// フィードバック作成
// --------------------------------------

export function createFeedback({

    player="unknown",

    message="",

    rating=5

}){


    const feedback={


        id:

        "feedback_"

        +

        Date.now(),



        player,



        message,



        rating,



        category:

        analyzeCategory(

            message

        ),



        priority:

        calculatePriority(

            rating

        ),



        created:

        Date.now()



    };



    feedbacks.push(

        feedback

    );



    saveFeedbacks();



    return feedback;


}



// --------------------------------------
// 内容分類
// --------------------------------------

function analyzeCategory(

    message

){


    const text=

        message.toLowerCase();



    if(

        text.includes(

            "bug"

        )

        ||

        text.includes(

            "error"

        )

    ){


        return "bug";


    }



    if(

        text.includes(

            "hard"

        )

        ||

        text.includes(

            "difficulty"

        )

    ){


        return "balance";


    }



    if(

        text.includes(

            "ui"

        )

        ||

        text.includes(

            "design"

        )

    ){


        return "ui";


    }



    return "general";


}



// --------------------------------------
// 優先度計算
// --------------------------------------

function calculatePriority(

    rating

){


    if(

        rating<=2

    ){


        return "high";


    }



    if(

        rating===3

    ){


        return "normal";


    }



    return "low";


}



// --------------------------------------
// 問題抽出
// --------------------------------------

export function analyzeFeedback(){


    const result={



        bug:0,



        balance:0,



        ui:0,



        general:0



    };



    feedbacks.forEach(

        feedback=>{


            result[

                feedback.category

            ]++;


        }

    );



    return result;


}



// --------------------------------------
// 改善候補生成
// --------------------------------------

export function generateImprovementTargets(){


    const analysis=

        analyzeFeedback();



    const targets=[];



    Object.keys(

        analysis

    ).forEach(

        key=>{


            if(

                analysis[key]>0

            ){


                targets.push({


                    category:

                    key,



                    count:

                    analysis[key]



                });


            }


        }

    );



    return targets;


}



// --------------------------------------
// 評価平均
// --------------------------------------

export function getAverageRating(){


    if(

        feedbacks.length===0

    )

        return 0;



    const total=

        feedbacks.reduce(

            (

                sum,

                f

            )=>

            sum+f.rating,

            0

        );



    return (

        total /

        feedbacks.length

    ).toFixed(2);


}



// --------------------------------------
// 全フィードバック
// --------------------------------------

export function getFeedbacks(){


    return feedbacks;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestFeedback(){


    return feedbacks[

        feedbacks.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getFeedbackAIInfo(){


    return {


        name:

        "Feedback AI",



        version:

        "1.0",



        feedbacks:

        feedbacks.length


    };


}
