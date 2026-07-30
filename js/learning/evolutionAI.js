// ======================================
// GameForge AI
// evolutionAI.js
// AI Evolution System
// ======================================



const EVOLUTION_KEY =

    "gameforge-evolution-history-v1";



let evolutions =

    loadEvolutions();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadEvolutions(){


    const data =

        localStorage.getItem(

            EVOLUTION_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveEvolutions(){


    localStorage.setItem(

        EVOLUTION_KEY,

        JSON.stringify(

            evolutions

        )

    );


}



// --------------------------------------
// AI作成
// --------------------------------------

export function createAIProfile({

    name="GameForge AI"

}){


    const ai={


        id:

        "ai_"

        +

        Date.now(),



        name,



        version:

        "1.0",



        level:

        1,



        experience:

        0,



        knowledge:

        [],



        abilities:

        {

            design:50,

            balance:50,

            learning:50,

            management:50

        },



        created:

        Date.now()



    };



    evolutions.push(

        ai

    );



    saveEvolutions();



    return ai;


}



// --------------------------------------
// 経験値追加
// --------------------------------------

export function addExperience(

    ai,

    value

){


    ai.experience += value;



    while(

        ai.experience >= 100

    ){


        ai.experience -= 100;


        levelUp(

            ai

        );


    }



    saveEvolutions();



    return ai;


}



// --------------------------------------
// レベルアップ
// --------------------------------------

function levelUp(

    ai

){


    ai.level++;



    Object.keys(

        ai.abilities

    ).forEach(

        key=>{


            ai.abilities[key]+=5;


        }

    );



    updateVersion(

        ai

    );


}



// --------------------------------------
// バージョン更新
// --------------------------------------

function updateVersion(

    ai

){


    const major=

        Math.floor(

            ai.level / 10

        );



    const minor=

        ai.level % 10;



    ai.version=

        `${major}.${minor}`;


}



// --------------------------------------
// 知識追加
// --------------------------------------

export function addKnowledge(

    ai,

    data

){


    ai.knowledge.push({


        data,



        date:

        Date.now()



    });



    addExperience(

        ai,

        10

    );



    saveEvolutions();



    return ai;


}



// --------------------------------------
// 能力評価
// --------------------------------------

export function evaluateAI(

    ai

){


    const values=

        Object.values(

            ai.abilities

        );



    const total=

        values.reduce(

            (

                a,

                b

            )=>

            a+b,

            0

        );



    return {


        level:

        ai.level,



        power:

        Math.floor(

            total /

            values.length

        ),



        version:

        ai.version



    };


}



// --------------------------------------
// 進化実行
// --------------------------------------

export function evolveAI(

    ai

){


    ai.level += 10;



    Object.keys(

        ai.abilities

    ).forEach(

        key=>{


            ai.abilities[key]+=20;


        }

    );



    updateVersion(

        ai

    );



    saveEvolutions();



    return ai;


}



// --------------------------------------
// 全AI
// --------------------------------------

export function getAIs(){


    return evolutions;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestAI(){


    return evolutions[

        evolutions.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getEvolutionAIInfo(){


    return {


        name:

        "Evolution AI",



        version:

        "1.0",



        AIs:

        evolutions.length


    };


}
