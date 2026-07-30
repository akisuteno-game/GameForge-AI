// ======================================
// GameForge AI
// storyAI.js
// Story Generation AI
// ======================================



const STORY_KEY =

    "gameforge-story-history-v1";



let stories =

    loadStories();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadStories(){


    const data =

        localStorage.getItem(

            STORY_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveStories(){


    localStorage.setItem(

        STORY_KEY,

        JSON.stringify(

            stories

        )

    );


}



// --------------------------------------
// ストーリー生成
// --------------------------------------

export function createStory({

    genre="RPG",

    theme="冒険"

}){


    const story={


        id:

        "story_"

        +

        Date.now(),



        title:

        generateTitle(

            theme

        ),



        world:

        generateWorld(

            genre

        ),



        characters:

        generateCharacters(),



        chapters:

        generateChapters(),



        quests:

        generateQuests(),



        created:

        Date.now()



    };



    stories.push(

        story

    );



    saveStories();



    return story;


}



// --------------------------------------
// タイトル生成
// --------------------------------------

function generateTitle(

    theme

){


    return `${theme}の伝説`;


}



// --------------------------------------
// 世界観生成
// --------------------------------------

function generateWorld(

    genre

){


    const worlds={


        RPG:

        `

魔法と剣が存在する世界。

古代文明の力を巡り、

英雄たちは未知の大陸へ旅立つ。

`,



        Fantasy:

        `

複数の王国が争う幻想世界。

`



    };



    return worlds[genre]

    ||

    worlds.RPG;


}



// --------------------------------------
// キャラクター生成
// --------------------------------------

function generateCharacters(){


    return [


        {


            name:

            "主人公",



            role:

            "冒険者",



            personality:

            "勇敢で仲間思い"



        },



        {


            name:

            "賢者ルナ",



            role:

            "魔法使い",



            personality:

            "冷静な分析家"



        },



        {


            name:

            "ガルド",



            role:

            "戦士",



            personality:

            "豪快な戦士"



        }



    ];


}



// --------------------------------------
// チャプター生成
// --------------------------------------

function generateChapters(){


    return [


        {


            id:1,


            title:

            "旅立ち",



            goal:

            "最初の街を出る"



        },



        {


            id:2,


            title:

            "古代遺跡",



            goal:

            "失われた力を探す"



        },



        {


            id:3,


            title:

            "最終決戦",



            goal:

            "世界を救う"



        }



    ];


}



// --------------------------------------
// クエスト生成
// --------------------------------------

function generateQuests(){


    return [


        {


            name:

            "森の調査",



            type:

            "探索",



            reward:

            "経験値 + 素材"



        },



        {


            name:

            "魔物討伐",



            type:

            "戦闘",



            reward:

            "装備"



        }



    ];


}



// --------------------------------------
// 会話生成
// --------------------------------------

export function createDialogue({

    character,

    situation

}){


    return {


        speaker:

        character,



        text:

        `${character}は${situation}について語った。`



    };


}



// --------------------------------------
// ストーリー履歴
// --------------------------------------

export function getStoryHistory(){


    return stories;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestStory(){


    return stories[

        stories.length-1

    ];


}



// --------------------------------------
// シナリオ出力
// --------------------------------------

export function exportScenario(

    story

){


    return `

# ${story.title}



## World

${story.world}



## Characters

${story.characters

.map(

c=>c.name

)

.join(", ")}



## Chapters

${story.chapters

.map(

c=>c.title

)

.join("\n")}

`;


}



// --------------------------------------
// 情報
// --------------------------------------

export function getStoryAIInfo(){


    return {


        name:

        "Story AI",



        version:

        "1.0",



        stories:

        stories.length


    };


}
