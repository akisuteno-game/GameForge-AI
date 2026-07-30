// ======================================
// GameForge AI
// versionAI.js
// Version Management AI
// ======================================



const VERSION_KEY =

    "gameforge-version-data-v1";



let versionData =

    loadVersion();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadVersion(){


    const data =

        localStorage.getItem(

            VERSION_KEY

        );



    return data

        ? JSON.parse(data)

        :

        {


            major:1,


            minor:0,


            patch:0,


            history:[]


        };


}



// --------------------------------------
// 保存
// --------------------------------------

function saveVersion(){


    localStorage.setItem(

        VERSION_KEY,

        JSON.stringify(

            versionData

        )

    );


}



// --------------------------------------
// バージョン文字列
// --------------------------------------

export function getVersion(){


    return `v${versionData.major}.${versionData.minor}.${versionData.patch}`;


}



// --------------------------------------
// 更新種類判定
// --------------------------------------

export function detectUpdateType(

    changes

){


    if(

        changes.major

    ){

        return "major";

    }



    if(

        changes.features

        &&

        changes.features.length

    ){

        return "minor";

    }



    return "patch";


}



// --------------------------------------
// バージョンアップ
// --------------------------------------

export function updateVersion(

    type="patch",

    description=""

){


    if(

        type==="major"

    ){


        versionData.major++;


        versionData.minor=0;


        versionData.patch=0;


    }



    else if(

        type==="minor"

    ){


        versionData.minor++;


        versionData.patch=0;


    }



    else{


        versionData.patch++;


    }



    const release={


        version:

            getVersion(),



        type,



        description,



        date:

            Date.now()


    };



    versionData.history.push(

        release

    );



    saveVersion();



    return release;


}



// --------------------------------------
// リリース履歴
// --------------------------------------

export function getReleaseHistory(){


    return versionData.history;


}



// --------------------------------------
// 最新リリース
// --------------------------------------

export function getLatestRelease(){


    return versionData.history[

        versionData.history.length-1

    ];


}



// --------------------------------------
// リリースノート生成
// --------------------------------------

export function createReleaseNote(){


    return versionData.history

    .map(

        item=>{


            return `

## ${item.version}


Type:

${item.type}


${item.description}

`;

        }

    )

    .join("\n");


}



// --------------------------------------
// バージョン設定
// --------------------------------------

export function setVersion(

    major,

    minor,

    patch

){


    versionData.major = major;


    versionData.minor = minor;


    versionData.patch = patch;



    saveVersion();


}



// --------------------------------------
// 情報
// --------------------------------------

export function getVersionAIInfo(){


    return {


        name:

        "GameForge Version AI",



        version:

        "1.0",



        current:

        getVersion()



    };


}
