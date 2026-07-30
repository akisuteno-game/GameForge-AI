// ======================================
// GameForge AI
// cloudAI.js
// Cloud Data Management AI
// ======================================



const CLOUD_KEY =

    "gameforge-cloud-history-v1";



let clouds =

    loadClouds();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadClouds(){


    const data =

        localStorage.getItem(

            CLOUD_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveClouds(){


    localStorage.setItem(

        CLOUD_KEY,

        JSON.stringify(

            clouds

        )

    );


}



// --------------------------------------
// クラウド作成
// --------------------------------------

export function createCloud({

    user="default",

    game="Game"

}){


    const cloud={


        id:

        "cloud_"

        +

        Date.now(),



        user,



        game,



        data:{},



        status:

        "offline",



        created:

        Date.now()



    };



    clouds.push(

        cloud

    );



    saveClouds();



    return cloud;


}



// --------------------------------------
// データ保存
// --------------------------------------

export function uploadData({

    cloud,

    data

}){


    cloud.data=

        data;



    cloud.status=

        "uploaded";



    cloud.updated=

        Date.now();



    saveClouds();



    return cloud;


}



// --------------------------------------
// データ取得
// --------------------------------------

export function downloadData(

    cloud

){


    return cloud.data;


}



// --------------------------------------
// 差分チェック
// --------------------------------------

export function compareData({

    local,

    cloud

}){


    const localSize=

        JSON.stringify(

            local

        ).length;



    const cloudSize=

        JSON.stringify(

            cloud

        ).length;



    return {


        localSize,



        cloudSize,



        difference:

        localSize -

        cloudSize



    };


}



// --------------------------------------
// クラウド状態
// --------------------------------------

export function checkCloudStatus(

    cloud

){


    return {


        id:

        cloud.id,



        status:

        cloud.status,



        lastUpdate:

        cloud.updated || null



    };


}



// --------------------------------------
// バックアップ作成
// --------------------------------------

export function createBackup(

    cloud

){


    return {


        backupId:

        "backup_"

        +

        Date.now(),



        data:

        JSON.parse(

            JSON.stringify(

                cloud.data

            )

        ),



        date:

        Date.now()



    };


}



// --------------------------------------
// 全クラウド
// --------------------------------------

export function getClouds(){


    return clouds;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestCloud(){


    return clouds[

        clouds.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getCloudAIInfo(){


    return {


        name:

        "Cloud AI",



        version:

        "1.0",



        clouds:

        clouds.length


    };


}
