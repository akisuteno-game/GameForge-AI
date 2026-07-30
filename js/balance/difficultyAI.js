// ======================================
// GameForge AI
// difficultyAI.js
// Difficulty Adjustment AI
// ======================================


const DIFFICULTY_KEY =

    "gameforge-difficulty-history-v1";



let difficulties =

    loadDifficulties();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadDifficulties(){


    const data =

        localStorage.getItem(

            DIFFICULTY_KEY

        );


    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveDifficulties(){


    localStorage.setItem(

        DIFFICULTY_KEY,

        JSON.stringify(

            difficulties

        )

    );


}



// --------------------------------------
// 難易度システム生成
// --------------------------------------

export function createDifficultySystem({

    mode="normal"

}){


    const system={


        id:

        "difficulty_"

        +

        Date.now(),



        mode,



        levels:

        generateLevels(),



        created:

        Date.now()



    };



    difficulties.push(

        system

    );



    saveDifficulties();



    return system;


}



// --------------------------------------
// 難易度一覧生成
// --------------------------------------

function generateLevels(){


    return [


        {


            name:

            "easy",



            enemy:

            0.8,



            reward:

            0.8



        },



        {


            name:

            "normal",



            enemy:

            1,



            reward:

            1



        },



        {


            name:

            "hard",



            enemy:

            1.5,



            reward:

            1.5



        },



        {


            name:

            "extreme",



            enemy:

            3,



            reward:

            3



        }



    ];


}



// --------------------------------------
// プレイヤー分析
// --------------------------------------

export function analyzePlayer({

    winRate,

    clearTime,

    damage

}){


    let result="normal";



    if(

        winRate > 0.9

        &&

        clearTime < 60

    ){


        result="increase";


    }



    if(

        winRate < 0.4

    ){


        result="decrease";


    }



    return {


        result,



        winRate,



        clearTime,



        damage



    };


}



// --------------------------------------
// 自動難易度調整
// --------------------------------------

export function autoAdjustDifficulty({

    current,

    analysis

}){


    let next=current;



    if(

        analysis.result==="increase"

    ){


        next += 1;


    }



    if(

        analysis.result==="decrease"

    ){


        next -= 1;


    }



    next=Math.max(

        1,

        Math.min(

            next,

            10

        )

    );



    return next;


}



// --------------------------------------
// 敵倍率計算
// --------------------------------------

export function calculateEnemyMultiplier(

    difficulty

){


    return Math.pow(

        1.15,

        difficulty

    );


}



// --------------------------------------
// ステージ難易度生成
// --------------------------------------

export function generateStageDifficulty(

    maxStage=100

){


    const stages=[];



    for(

        let i=1;

        i<=maxStage;

        i++

    ){


        stages.push({


            stage:i,



            difficulty:

            Math.floor(

                i / 10

            )

            +1



        });


    }



    return stages;


}



// --------------------------------------
// ボス難易度
// --------------------------------------

export function calculateBossDifficulty(

    stage

){


    return {


        hpMultiplier:

        5 +

        stage * 0.2,



        atkMultiplier:

        3 +

        stage * 0.1



    };


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getDifficultyHistory(){


    return difficulties;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestDifficulty(){


    return difficulties[

        difficulties.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getDifficultyAIInfo(){


    return {


        name:

        "Difficulty AI",



        version:

        "1.0",



        systems:

        difficulties.length


    };


}
