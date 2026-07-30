// ======================================
// GameForge AI
// rewardAI.js
// Reward Design AI
// ======================================



const REWARD_KEY =

    "gameforge-reward-history-v1";



let rewards =

    loadRewards();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadRewards(){


    const data =

        localStorage.getItem(

            REWARD_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveRewards(){


    localStorage.setItem(

        REWARD_KEY,

        JSON.stringify(

            rewards

        )

    );


}



// --------------------------------------
// 報酬システム生成
// --------------------------------------

export function createRewardSystem({

    gameType="rpg",

    maxStage=100

}){


    const system={


        id:

        "reward_"

        +

        Date.now(),



        gameType,



        stages:

        generateStageRewards(

            maxStage

        ),



        rarity:

        createRarity(),



        chest:

        createChestSystem(),



        created:

        Date.now()



    };



    rewards.push(

        system

    );



    saveRewards();



    return system;


}



// --------------------------------------
// ステージ報酬生成
// --------------------------------------

function generateStageRewards(

    maxStage

){


    const result=[];



    for(

        let i=1;

        i<=maxStage;

        i++

    ){


        result.push({


            stage:i,



            gold:

            i *

            100,



            exp:

            i *

            50,



            items:

            generateItems(

                i

            )



        });


    }



    return result;


}



// --------------------------------------
// アイテム生成
// --------------------------------------

function generateItems(

    stage

){


    return [


        {


            name:

            "強化素材",



            rate:

            50



        },



        {


            name:

            "レア素材",



            rate:

            Math.min(

                5 +

                stage,

                30

            )



        }



    ];


}



// --------------------------------------
// レアリティ
// --------------------------------------

function createRarity(){


    return {


        common:

        70,



        uncommon:

        20,



        rare:

        8,



        legendary:

        2



    };


}



// --------------------------------------
// 宝箱生成
// --------------------------------------

function createChestSystem(){


    return {


        normal:


        {


            rewards:

            [

                "gold",

                "item"

            ]

        },



        rare:


        {


            chance:

            10,



            rewards:

            [

                "rare_item",

                "equipment"

            ]

        }



    };


}



// --------------------------------------
// ドロップ調整
// --------------------------------------

export function adjustDropRate({

    rate,

    playerLuck

}){


    return Math.min(

        100,

        rate +

        playerLuck

    );


}



// --------------------------------------
// レア報酬生成
// --------------------------------------

export function createRareReward({

    level

}){


    return {


        name:

        "Legendary Item",



        power:

        level *

        10,



        rarity:

        "legendary"



    };


}



// --------------------------------------
// 満足度分析
// --------------------------------------

export function analyzeRewardSatisfaction({

    rewardCount,

    playTime

}){


    const ratio =

        rewardCount /

        Math.max(

            playTime,

            1

        );



    if(

        ratio < 0.5

    ){


        return "increase";


    }



    return "normal";


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getRewardHistory(){


    return rewards;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestReward(){


    return rewards[

        rewards.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getRewardAIInfo(){


    return {


        name:

        "Reward AI",



        version:

        "1.0",



        systems:

        rewards.length


    };


}
