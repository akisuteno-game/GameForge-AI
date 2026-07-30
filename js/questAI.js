// ======================================
// GameForge AI
// questAI.js
// Quest Generation AI
// ======================================



const QUEST_KEY =
    "gameforge-quest-data-v1";



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

        ? JSON.parse(data)

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
// クエストタイトル生成
// --------------------------------------

function generateTitle(

    type

){


    const titles={


        hunt:[

            "魔物討伐作戦",

            "危険区域の掃討",

            "闇の軍勢を倒せ"

        ],


        collect:[

            "失われた素材",

            "幻のアイテム探索",

            "古代素材の回収"

        ],


        story:[

            "王国の秘密",

            "忘れられた伝説",

            "新たな旅立ち"

        ]


    };



    const list =

        titles[type]

        ||

        titles.hunt;



    return list[

        Math.floor(

            Math.random()

            *

            list.length

        )

    ];


}



// --------------------------------------
// クエスト生成
// --------------------------------------

export function createQuest({

    type="hunt",

    target="enemy",

    amount=10,

    level=1

}){


    const quest={


        id:

            "quest_"

            +

            Date.now(),



        title:

            generateTitle(

                type

            ),



        type,



        condition:{


            target,


            amount



        },



        reward:{


            exp:

                level *

                100,



            gold:

                level *

                50,



            items:[

                {

                    name:

                    "素材アイテム",


                    count:

                    level

                }

            ]


        },



        unlock:{


            level



        },



        completed:false,



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
// ストーリークエスト生成
// --------------------------------------

export function createStoryQuest(

    chapter,

    story

){


    return createQuest({

        type:"story",

        target:

            "chapter_"+chapter,

        amount:1,

        level:chapter


    });


}



// --------------------------------------
// クエスト達成判定
// --------------------------------------

export function checkQuestProgress(

    questId,

    progress

){


    const quest =

        quests.find(

            q=>

            q.id===questId

        );



    if(!quest){

        return false;

    }



    if(

        progress >=

        quest.condition.amount

    ){


        quest.completed=true;



    }



    saveQuests();



    return quest.completed;


}



// --------------------------------------
// 未完了取得
// --------------------------------------

export function getActiveQuests(){


    return quests.filter(

        q=>

        !q.completed

    );


}



// --------------------------------------
// 完了済み取得
// --------------------------------------

export function getCompletedQuests(){


    return quests.filter(

        q=>

        q.completed

    );


}



// --------------------------------------
// 難易度別生成
// --------------------------------------

export function generateQuestByLevel(

    level

){


    return createQuest({

        type:

            level > 50

            ?

            "story"

            :

            "hunt",


        target:

            "enemy",


        amount:

            level * 5,


        level


    });


}



// --------------------------------------
// クエスト文章生成
// --------------------------------------

export function createQuestText(

    quest

){


    return `

# ${quest.title}


目的:

${quest.condition.target}

を

${quest.condition.amount}

達成


報酬:

経験値 ${quest.reward.exp}

ゴールド ${quest.reward.gold}



`;

}



// --------------------------------------
// 統計
// --------------------------------------

export function getQuestStats(){


    return {


        total:

            quests.length,


        completed:

            getCompletedQuests()

            .length


    };


}



// --------------------------------------
// 情報
// --------------------------------------

export function getQuestAIInfo(){


    return {


        name:

        "GameForge Quest AI",


        version:

        "1.0",


        quests:

        quests.length


    };


}
