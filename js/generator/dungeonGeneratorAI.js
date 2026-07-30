// ======================================
// GameForge AI
// dungeonGeneratorAI.js
// Dungeon Generation AI
// ======================================



const DUNGEON_KEY =

    "gameforge-dungeon-history-v1";



let dungeons =

    loadDungeons();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadDungeons(){


    const data =

        localStorage.getItem(

            DUNGEON_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveDungeons(){


    localStorage.setItem(

        DUNGEON_KEY,

        JSON.stringify(

            dungeons

        )

    );


}



// --------------------------------------
// ダンジョン生成
// --------------------------------------

export function generateDungeon({

    name="Unknown Dungeon",

    floor=10,

    difficulty=1

}){


    const dungeon={


        id:

        "dungeon_"

        +

        Date.now(),



        name,



        floor,



        difficulty,



        rooms:

        createRooms(

            floor,

            difficulty

        ),



        boss:

        createBoss(

            difficulty

        ),



        created:

        Date.now()



    };



    dungeons.push(

        dungeon

    );



    saveDungeons();



    return dungeon;


}



// --------------------------------------
// 部屋生成
// --------------------------------------

function createRooms(

    floor,

    difficulty

){


    const rooms=[];



    for(

        let i=1;

        i<=floor;

        i++

    ){


        rooms.push({


            id:

            i,



            type:

            randomRoomType(),



            enemies:

            createEnemies(

                difficulty,

                i

            ),



            treasure:

            createTreasure(

                i

            )



        });


    }



    return rooms;


}



// --------------------------------------
// 部屋タイプ
// --------------------------------------

function randomRoomType(){


    const types=[


        "battle",

        "treasure",

        "event",

        "rest"



    ];



    return types[

        Math.floor(

            Math.random()

            *

            types.length

        )

    ];


}



// --------------------------------------
// 敵配置
// --------------------------------------

function createEnemies(

    difficulty,

    floor

){


    const count=

        difficulty +

        Math.floor(

            floor / 3

        );



    const enemies=[];



    for(

        let i=0;

        i<count;

        i++

    ){


        enemies.push({


            name:

            `Monster_${floor}_${i+1}`,



            level:

            difficulty *

            floor



        });


    }



    return enemies;


}



// --------------------------------------
// 宝箱生成
// --------------------------------------

function createTreasure(

    floor

){


    return {


        gold:

        floor * 50,



        item:

        `Dungeon_Item_${floor}`



    };


}



// --------------------------------------
// ボス生成
// --------------------------------------

function createBoss(

    difficulty

){


    return {


        name:

        "Dungeon Boss",



        level:

        difficulty * 10,



        hp:

        difficulty * 10000,



        reward:

        {

            gold:

            difficulty * 1000,



            item:

            "Boss_Item"

        }



    };


}



// --------------------------------------
// 周回ダンジョン
// --------------------------------------

export function generateLoopDungeon({

    baseName,

    count=5

}){


    const result=[];



    for(

        let i=1;

        i<=count;

        i++

    ){


        result.push(

            generateDungeon({


                name:

                `${baseName}_${i}`,



                floor:

                i * 10,



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

export function adjustDungeonDifficulty({

    dungeon,

    playerLevel

}){


    dungeon.difficulty=

        Math.max(

            1,

            Math.floor(

                playerLevel /

                10

            )

        );



    return dungeon;


}



// --------------------------------------
// ダンジョン検索
// --------------------------------------

export function searchDungeon(

    keyword

){


    return dungeons.filter(

        d=>

        d.name.includes(

            keyword

        )

    );


}



// --------------------------------------
// 全ダンジョン
// --------------------------------------

export function getDungeons(){


    return dungeons;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestDungeon(){


    return dungeons[

        dungeons.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getDungeonGeneratorAIInfo(){


    return {


        name:

        "Dungeon Generator AI",



        version:

        "1.0",



        dungeons:

        dungeons.length


    };


}
