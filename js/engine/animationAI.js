// ======================================
// GameForge AI
// animationAI.js
// Animation System Design AI
// ======================================



const ANIMATION_KEY =

    "gameforge-animation-history-v1";



let animations =

    loadAnimations();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadAnimations(){


    const data =

        localStorage.getItem(

            ANIMATION_KEY

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

function saveAnimations(){


    localStorage.setItem(

        ANIMATION_KEY,

        JSON.stringify(

            animations

        )

    );


}



// --------------------------------------
// アニメーションセット作成
// --------------------------------------

export function createAnimationSet({

    character="Player"

}){


    const animation={


        id:

        "animation_"

        +

        Date.now(),



        character,



        bones:

        createBones(),



        motions:

        createBasicMotions(),



        states:

        createStateMachine(),



        created:

        Date.now()



    };



    animations.push(

        animation

    );



    saveAnimations();



    return animation;


}



// --------------------------------------
// ボーン生成
// --------------------------------------

function createBones(){


    return [


        "root",

        "spine",

        "head",

        "leftArm",

        "rightArm",

        "leftLeg",

        "rightLeg"



    ];


}



// --------------------------------------
// 基本モーション
// --------------------------------------

function createBasicMotions(){


    return [


        {


            name:

            "idle",



            duration:

            2000



        },



        {


            name:

            "walk",



            duration:

            800



        },



        {


            name:

            "run",



            duration:

            500



        },



        {


            name:

            "attack",



            duration:

            700



        },



        {


            name:

            "damage",



            duration:

            400



        }



    ];


}



// --------------------------------------
// 状態マシン
// --------------------------------------

function createStateMachine(){


    return {


        idle:


        {


            next:

            [

                "walk",

                "attack"

            ]

        },



        walk:


        {


            next:

            [

                "run",

                "idle"

            ]

        },



        run:


        {


            next:

            [

                "attack",

                "idle"

            ]

        },



        attack:


        {


            next:

            [

                "idle"

            ]

        }



    };


}



// --------------------------------------
// モーション追加
// --------------------------------------

export function addMotion(

    animation,

    motion

){


    animation.motions.push({


        name:

        motion.name,



        duration:

        motion.duration || 1000



    });



    saveAnimations();



    return animation;


}



// --------------------------------------
// 攻撃モーション生成
// --------------------------------------

export function createAttackAnimation({

    weapon="sword"

}){


    return {


        name:

        `${weapon}_attack`,



        frames:


        [


            "prepare",


            "swing",


            "impact",


            "return"



        ],



        duration:

        800



    };


}



// --------------------------------------
// カットシーン用
// --------------------------------------

export function createCinematicAnimation(){


    return {


        type:

        "cinematic",



        camera:

        true,



        facial:

        true,



        motion:

        "advanced"



    };


}



// --------------------------------------
// アニメーション評価
// --------------------------------------

export function analyzeAnimation(

    animation

){


    return {


        character:

        animation.character,



        motions:

        animation.motions.length,



        bones:

        animation.bones.length



    };


}



// --------------------------------------
// 履歴
// --------------------------------------

export function getAnimationHistory(){


    return animations;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestAnimation(){


    return animations[

        animations.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getAnimationAIInfo(){


    return {


        name:

        "Animation AI",



        version:

        "1.0",



        animations:

        animations.length


    };


}
