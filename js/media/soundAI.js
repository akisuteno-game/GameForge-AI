// ======================================
// GameForge AI
// soundAI.js
// Sound Design AI
// ======================================



const SOUND_KEY =

    "gameforge-sound-history-v1";



let sounds =

    loadSounds();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadSounds(){


    const data =

        localStorage.getItem(

            SOUND_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveSounds(){


    localStorage.setItem(

        SOUND_KEY,

        JSON.stringify(

            sounds

        )

    );


}



// --------------------------------------
// サウンド作成
// --------------------------------------

export function createSound({

    name="New Sound",

    type="bgm",

    mood="fantasy"

}){


    const sound={


        id:

        "sound_"

        +

        Date.now(),



        name,



        type,



        mood,



        settings:

        createSoundSettings(

            type,

            mood

        ),



        prompt:

        createMusicPrompt(

            name,

            mood

        ),



        created:

        Date.now()



    };



    sounds.push(

        sound

    );



    saveSounds();



    return sound;


}



// --------------------------------------
// 音設定
// --------------------------------------

function createSoundSettings(

    type,

    mood

){


    return {


        volume:

        80,



        loop:

        type==="bgm",



        fade:

        true,



        atmosphere:

        mood



    };


}



// --------------------------------------
// 音楽生成プロンプト
// --------------------------------------

function createMusicPrompt(

    name,

    mood

){


    return `

${name}

game music,

${mood} atmosphere,

high quality soundtrack,

cinematic style

`;


}



// --------------------------------------
// BGM生成
// --------------------------------------

export function createBGM({

    name,

    area="field"

}){


    return createSound({


        name,

        type:

        "bgm",



        mood:

        area



    });


}



// --------------------------------------
// 戦闘曲生成
// --------------------------------------

export function createBattleMusic({

    boss=false

}){


    return createSound({


        name:

        boss

        ?

        "Boss Battle"

        :

        "Battle Theme",



        type:

        "battle",



        mood:

        boss

        ?

        "epic"

        :

        "action"



    });


}



// --------------------------------------
// 効果音生成
// --------------------------------------

export function createSE(

    name

){


    return createSound({


        name,

        type:

        "se",



        mood:

        "effect"



    });


}



// --------------------------------------
// 環境音生成
// --------------------------------------

export function createEnvironmentSound(

    area

){


    return createSound({


        name:

        `${area} Environment`,



        type:

        "environment",



        mood:

        area



    });


}



// --------------------------------------
// 音量変更
// --------------------------------------

export function setVolume(

    sound,

    volume

){


    sound.settings.volume=

        volume;



    saveSounds();



    return sound;


}



// --------------------------------------
// 検索
// --------------------------------------

export function searchSounds(

    type

){


    return sounds.filter(

        s=>

        s.type===type

    );


}



// --------------------------------------
// 全一覧
// --------------------------------------

export function getSounds(){


    return sounds;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestSound(){


    return sounds[

        sounds.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getSoundAIInfo(){


    return {


        name:

        "Sound AI",



        version:

        "1.0",



        sounds:

        sounds.length


    };


}
