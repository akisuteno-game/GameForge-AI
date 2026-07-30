// ======================================
// GameForge AI
// questGeneratorAI.js
// Quest Generation AI
// ======================================



const QUEST_KEY =

    "gameforge-quest-history-v1";



let quests =

    loadQuests();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadQuests(){


    const data =

        localStorage.getItem(

            QUEST_KEY

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

function saveQuests(){


    localStorage.setItem(

        QUEST_KEY,

        JSON.stringify(

            quests

        )

    );


}



// --------------------------------------
// クエスト生成
// --------------------------------------

export function generateQuest({

    name="New Quest",

    difficulty=1,

    type="battle"

}){


    const quest={


        id:

        "quest_"

        +

        Date.now(),



        name,



        type,



        difficulty,



        objective:

        createObjective(

            type

        ),



        enemies:

        createEnemies(

            difficulty

        ),



        reward:

        createReward(

            difficulty

        ),



        created:

        Date.now()



    };



    quests.push(

        quest

    );



    saveQuests();



    return quest;


}



// --------------------------------------
// 目的生成
// --------------------------------------

function createObjective(

    type

){


    const objectives={


        battle:

        "敵を討伐する",



        collect:

        "素材を集める",



        explore:

        "未知の場所を探索する"



    };



    return objectives[type]

        ||

        objectives.battle;


}



// --------------------------------------
// 敵生成
// --------------------------------------

function createEnemies(

    difficulty

){


    const count=

        difficulty * 3;



    const result=[];



    for(

        let i=0;

        i<count;

        i++

    ){


        result.push({


            name:

            `Enemy_${i+1}`,



            level:

            difficulty



        });


    }



    return result;


}



// --------------------------------------
// 報酬生成
// --------------------------------------

function createReward(

    difficulty

){


    return {


        gold:

        difficulty * 100,



        experience:

        difficulty * 50,



        item:

        `Reward_Item_${difficulty}`



    };


}



// --------------------------------------
// 周回クエスト生成
// --------------------------------------

export function generateRepeatQuest({

    base,

    count=10

}){


    const result=[];



    for(

        let i=1;

        i<=count;

        i++

    ){


        result.push(

            generateQuest({


                name:

                `${base}_${i}`,



                difficulty:

                i



            })

        );


    }



    return result;


}



// --------------------------------------
// 難易度調整
// --------------------------------------

export function adjustDifficulty({

    quest,

    playerLevel

}){


    quest.difficulty=

        Math.max(

            1,

            Math.floor(

                playerLevel /

                5

            )

        );



    return quest;


}



// --------------------------------------
// クエスト検索
// --------------------------------------

export function searchQuest(

    keyword

){


    return quests.filter(

        q=>

        q.name.includes(

            keyword

        )

    );


}



// --------------------------------------
// 全クエスト
// --------------------------------------

export function getQuests(){


    return quests;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestQuest(){


    return quests[

        quests.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getQuestGeneratorAIInfo(){


    return {


        name:

        "Quest Generator AI",



        version:

        "1.0",



        quests:

        quests.length


    };


}
