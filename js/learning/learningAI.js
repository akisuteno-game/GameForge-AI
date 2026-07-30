// ======================================
// GameForge AI
// learningAI.js
// Self Learning System AI
// ======================================



const LEARNING_KEY =

    "gameforge-learning-history-v1";



let learningData =

    loadLearning();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadLearning(){


    const data =

        localStorage.getItem(

            LEARNING_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveLearning(){


    localStorage.setItem(

        LEARNING_KEY,

        JSON.stringify(

            learningData

        )

    );


}



// --------------------------------------
// 学習データ作成
// --------------------------------------

export function createLearningProfile({

    game="Game",

    player="default"

}){


    const profile={


        id:

        "learning_"

        +

        Date.now(),



        game,



        player,



        sessions:

        [],



        patterns:

        {},



        knowledge:

        [],



        created:

        Date.now()



    };



    learningData.push(

        profile

    );



    saveLearning();



    return profile;


}



// --------------------------------------
// プレイ記録
// --------------------------------------

export function recordPlay({

    profile,

    action,

    result

}){


    profile.sessions.push({


        action,



        result,



        time:

        Date.now()



    });



    analyzePattern(

        profile

    );



    saveLearning();



    return profile;


}



// --------------------------------------
// 行動分析
// --------------------------------------

function analyzePattern(

    profile

){


    const count={};



    profile.sessions.forEach(

        session=>{


            if(

                !count[session.action]

            ){


                count[session.action]=0;


            }



            count[session.action]++;


        }

    );



    profile.patterns=count;


}



// --------------------------------------
// プレイヤー傾向分析
// --------------------------------------

export function analyzePlayerBehavior(

    profile

){


    const sessions=

        profile.sessions;



    if(

        sessions.length===0

    ){


        return {


            type:

            "unknown"



        };


    }



    const actions=

        sessions.map(

            s=>

            s.action

        );



    const unique=

        new Set(

            actions

        ).size;



    return {


        playCount:

        sessions.length,



        variety:

        unique,



        style:

        unique > 5

        ?

        "explorer"

        :

        "focused"



    };


}



// --------------------------------------
// 知識追加
// --------------------------------------

export function addKnowledge(

    profile,

    knowledge

){


    profile.knowledge.push({


        data:

        knowledge,



        date:

        Date.now()



    });



    saveLearning();



    return profile;


}



// --------------------------------------
// AI改善データ生成
// --------------------------------------

export function generateImprovementData(

    profile

){


    return {


        player:

        profile.player,



        problems:

        findProblems(

            profile

        ),



        suggestions:

        createSuggestions(

            profile

        )



    };


}



// --------------------------------------
// 問題発見
// --------------------------------------

function findProblems(

    profile

){


    const problems=[];



    if(

        profile.sessions.length < 10

    ){


        problems.push(

            "プレイ不足"

        );


    }



    return problems;


}



// --------------------------------------
// 改善案生成
// --------------------------------------

function createSuggestions(

    profile

){


    return [


        "報酬バランス確認",

        "難易度確認",

        "UI改善検討"



    ];


}



// --------------------------------------
// 全データ
// --------------------------------------

export function getLearningData(){


    return learningData;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestLearning(){


    return learningData[

        learningData.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getLearningAIInfo(){


    return {


        name:

        "Learning AI",



        version:

        "1.0",



        profiles:

        learningData.length


    };


}
