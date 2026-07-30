// ======================================
// GameForge AI
// characterAI.js
// Character Creation AI
// ======================================



const CHARACTER_KEY =

    "gameforge-character-history-v1";



let characters =

    loadCharacters();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadCharacters(){


    const data =

        localStorage.getItem(

            CHARACTER_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveCharacters(){


    localStorage.setItem(

        CHARACTER_KEY,

        JSON.stringify(

            characters

        )

    );


}



// --------------------------------------
// キャラクター生成
// --------------------------------------

export function createCharacter({

    name="Unknown",

    role="warrior",

    race="human"

}){


    const character={


        id:

        "character_"

        +

        Date.now(),



        name,



        race,



        role,



        appearance:

        createAppearance(

            race,

            role

        ),



        status:

        createStatus(

            role

        ),



        personality:

        createPersonality(),



        background:

        createBackground(

            race,

            role

        ),



        skills:

        createSkills(

            role

        ),



        created:

        Date.now()



    };



    characters.push(

        character

    );



    saveCharacters();



    return character;


}



// --------------------------------------
// 外見生成
// --------------------------------------

function createAppearance(

    race,

    role

){


    return {


        race,



        style:

        `${role} fantasy style`,



        hair:

        randomChoice(

            [

                "黒髪",

                "銀髪",

                "金髪",

                "赤髪"

            ]

        ),



        eyes:

        randomChoice(

            [

                "青",

                "赤",

                "緑"

            ]

        )



    };


}



// --------------------------------------
// ステータス生成
// --------------------------------------

function createStatus(

    role

){


    const status={


        hp:100,


        atk:20,


        defense:10,


        magic:10,


        speed:10



    };



    if(role==="warrior"){


        status.hp+=100;

        status.atk+=30;


    }



    if(role==="mage"){


        status.magic+=50;


    }



    if(role==="rogue"){


        status.speed+=40;


    }



    return status;


}



// --------------------------------------
// 性格生成
// --------------------------------------

function createPersonality(){


    return randomChoice(

        [

            "勇敢",

            "冷静",

            "自由人",

            "仲間思い",

            "謎多き人物"

        ]

    );


}



// --------------------------------------
// 背景生成
// --------------------------------------

function createBackground(

    race,

    role

){


    return `

${race}の${role}。

過去に秘密を持ち、

世界の運命に関わる存在。

`;



}



// --------------------------------------
// スキル生成
// --------------------------------------

function createSkills(

    role

){


    const skills={



        warrior:

        [

            "斬撃",

            "防御"

        ],



        mage:

        [

            "炎魔法",

            "回復魔法"

        ],



        rogue:

        [

            "奇襲",

            "回避"

        ]



    };



    return skills[role]

    ||

    [

        "通常攻撃"

    ];


}



// --------------------------------------
// ランダム選択
// --------------------------------------

function randomChoice(

    array

){


    return array[

        Math.floor(

            Math.random()

            *

            array.length

        )

    ];


}



// --------------------------------------
// キャラ一覧
// --------------------------------------

export function getCharacters(){


    return characters;


}



// --------------------------------------
// 検索
// --------------------------------------

export function findCharacter(

    name

){


    return characters.find(

        c=>

        c.name===name

    );


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestCharacter(){


    return characters[

        characters.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getCharacterAIInfo(){


    return {


        name:

        "Character AI",



        version:

        "1.0",



        characters:

        characters.length


    };


}
