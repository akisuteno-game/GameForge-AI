// ======================================
// GameForge AI
// physicsAI.js
// Physics System Design AI
// ======================================



const PHYSICS_KEY =

    "gameforge-physics-history-v1";



let physicsSystems =

    loadPhysics();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadPhysics(){


    const data =

        localStorage.getItem(

            PHYSICS_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function savePhysics(){


    localStorage.setItem(

        PHYSICS_KEY,

        JSON.stringify(

            physicsSystems

        )

    );


}



// --------------------------------------
// 物理システム作成
// --------------------------------------

export function createPhysicsSystem({

    gravity=9.8,

    type="realistic"

}){


    const system={


        id:

        "physics_"

        +

        Date.now(),



        type,



        gravity,



        collision:

        createCollisionSystem(),



        objects:

        [],



        created:

        Date.now()



    };



    physicsSystems.push(

        system

    );



    savePhysics();



    return system;


}



// --------------------------------------
// 衝突システム
// --------------------------------------

function createCollisionSystem(){


    return {


        enabled:true,



        type:

        "box",



        detection:

        "continuous"



    };


}



// --------------------------------------
// 物理オブジェクト追加
// --------------------------------------

export function addPhysicsObject(

    system,

    object

){


    const physicsObject={


        id:

        Date.now(),



        name:

        object.name,



        mass:

        object.mass || 1,



        friction:

        object.friction || 0.5,



        bounce:

        object.bounce || 0,



        movable:

        object.movable ?? true



    };



    system.objects.push(

        physicsObject

    );



    savePhysics();



    return physicsObject;


}



// --------------------------------------
// 重力設定
// --------------------------------------

export function setGravity(

    system,

    value

){


    system.gravity=

        value;



    savePhysics();



    return system;


}



// --------------------------------------
// ジャンプ設定
// --------------------------------------

export function createJumpSystem({

    power=10

}){


    return {


        type:

        "jump",



        force:

        power,



        cooldown:

        500



    };


}



// --------------------------------------
// 移動システム
// --------------------------------------

export function createMovementSystem({

    speed=5

}){


    return {


        type:

        "character_move",



        speed,



        acceleration:

        0.5,



        smooth:

        true



    };


}



// --------------------------------------
// 乗り物物理
// --------------------------------------

export function createVehiclePhysics(){


    return {


        engine:

        100,



        maxSpeed:

        200,



        handling:

        0.8,



        drift:

        true



    };


}



// --------------------------------------
// 物理シミュレーション評価
// --------------------------------------

export function analyzePhysics(

    system

){


    return {


        objects:

        system.objects.length,



        gravity:

        system.gravity,



        collision:

        system.collision.enabled



    };


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getPhysicsHistory(){


    return physicsSystems;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestPhysics(){


    return physicsSystems[

        physicsSystems.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getPhysicsAIInfo(){


    return {


        name:

        "Physics AI",



        version:

        "1.0",



        systems:

        physicsSystems.length


    };


}
