// ======================================
// GameForge AI
// monsterAI.js
// Monster Creation AI
// ======================================



const MONSTER_KEY =

    "gameforge-monster-history-v1";



let monsters =

    loadMonsters();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadMonsters(){


    const data =

        localStorage.getItem(

            MONSTER_KEY

        );


    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveMonsters(){


    localStorage.setItem(

        MONSTER_KEY,

        JSON.stringify(

            monsters

        )

    );


}



// --------------------------------------
// モンスター生成
// --------------------------------------

export function createMonster({

    name="Unknown Monster",

    type="beast",

    rank="normal",

    level=1

}){


    const monster={


        id:

        "monster_"

        +

        Date.now(),



        name,



        type,



        rank,



        level,



        element:

        createElement(),



        status:

        createStatus(

            level,

            rank

        ),



        drops:

        createDrops(

            rank

        ),



        skills:

        createSkills(

            type

        ),



        appearance:

        createAppearance(

            type,

            rank

        ),



        created:

        Date.now()



    };



    monsters.push(

        monster

    );



    saveMonsters();



    return monster;


}



// --------------------------------------
// 属性生成
// --------------------------------------

function createElement(){


    const elements=[


        "fire",

        "water",

        "earth",

        "wind",

        "dark",

        "light"



    ];



    return elements[

        Math.floor(

            Math.random()

            *

            elements.length

        )

    ];


}



// --------------------------------------
// ステータス生成
// --------------------------------------

function createStatus(

    level,

    rank

){


    let multiplier=1;



    if(rank==="elite"){


        multiplier=3;


    }



    if(rank==="boss"){


        multiplier=10;


    }



    return {


        hp:

        Math.floor(

            100 *

            level *

            multiplier

        ),



        atk:

        Math.floor(

            20 *

            level *

            multiplier

        ),



        defense:

        Math.floor(

            10 *

            level *

            multiplier

        ),



        speed:

        2000



    };


}



// --------------------------------------
// ドロップ生成
// --------------------------------------

function createDrops(

    rank

){


    const drops=[


        {


            item:

            "魔物の素材",



            rate:

            50



        }



    ];



    if(rank==="boss"){


        drops.push({


            item:

            "ボスの宝石",



            rate:

            10



        });


    }



    return drops;


}



// --------------------------------------
// スキル生成
// --------------------------------------

function createSkills(

    type

){


    const skills={



        beast:

        [

            "かみつき",

            "突進"

        ],



        dragon:

        [

            "炎の息吹",

            "飛翔攻撃"

        ],



        undead:

        [

            "呪い",

            "復活"

        ]



    };



    return skills[type]

    ||

    [

        "通常攻撃"

    ];


}



// --------------------------------------
// 外見生成
// --------------------------------------

function createAppearance(

    type,

    rank

){


    return {


        style:

        `${rank} ${type} monster`,



        size:

        rank==="boss"

        ?

        "large"

        :

        "normal",



        color:

        randomColor()



    };


}



// --------------------------------------
// 色生成
// --------------------------------------

function randomColor(){


    const colors=[


        "red",

        "blue",

        "black",

        "green",

        "purple"



    ];



    return colors[

        Math.floor(

            Math.random()

            *

            colors.length

        )

    ];


}



// --------------------------------------
// ボス生成
// --------------------------------------

export function createBoss({

    name="Demon King",

    level=100

}){


    return createMonster({


        name,

        type:

        "demon",

        rank:

        "boss",

        level



    });


}



// --------------------------------------
// モンスター一覧
// --------------------------------------

export function getMonsters(){


    return monsters;


}



// --------------------------------------
// 種類検索
// --------------------------------------

export function searchMonster(

    type

){


    return monsters.filter(

        m=>

        m.type===type

    );


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestMonster(){


    return monsters[

        monsters.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getMonsterAIInfo(){


    return {


        name:

        "Monster AI",



        version:

        "1.0",



        monsters:

        monsters.length


    };


}
