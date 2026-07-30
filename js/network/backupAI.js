// ======================================
// GameForge AI
// backupAI.js
// Backup Management AI
// ======================================



const BACKUP_KEY =

    "gameforge-backup-history-v1";



let backups =

    loadBackups();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadBackups(){


    const data =

        localStorage.getItem(

            BACKUP_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveBackups(){


    localStorage.setItem(

        BACKUP_KEY,

        JSON.stringify(

            backups

        )

    );


}



// --------------------------------------
// バックアップ作成
// --------------------------------------

export function createBackup({

    name="Auto Backup",

    data={}

}){


    const backup={


        id:

        "backup_"

        +

        Date.now(),



        name,



        data:

        cloneData(

            data

        ),



        size:

        JSON.stringify(

            data

        ).length,



        version:

        1,



        created:

        Date.now()



    };



    backups.push(

        backup

    );



    saveBackups();



    return backup;


}



// --------------------------------------
// データコピー
// --------------------------------------

function cloneData(

    data

){


    return JSON.parse(

        JSON.stringify(

            data

        )

    );


}



// --------------------------------------
// 復元
// --------------------------------------

export function restoreBackup(

    id

){


    const backup=

        backups.find(

            b=>

            b.id===id

        );



    if(!backup)

        return null;



    return cloneData(

        backup.data

    );


}



// --------------------------------------
// 自動バックアップ
// --------------------------------------

export function autoBackup({

    data,

    interval=3600000

}){


    const backup =

        createBackup({


            name:

            "Auto Backup",



            data



        });



    return {


        backup,



        next:

        Date.now()

        +

        interval



    };


}



// --------------------------------------
// 世代管理
// --------------------------------------

export function limitBackupGeneration(

    max=10

){


    if(

        backups.length >

        max

    ){


        backups=

            backups.slice(

                backups.length-max

            );



        saveBackups();


    }



    return backups;


}



// --------------------------------------
// 破損チェック
// --------------------------------------

export function checkBackupIntegrity(

    backup

){


    try{


        JSON.stringify(

            backup.data

        );



        return {


            valid:

            true



        };


    }

    catch(e){


        return {


            valid:

            false,



            error:

            e.message



        };


    }


}



// --------------------------------------
// バックアップ比較
// --------------------------------------

export function compareBackup(

    id1,

    id2

){


    const a=

        backups.find(

            b=>

            b.id===id1

        );



    const b=

        backups.find(

            b=>

            b.id===id2

        );



    if(

        !a ||

        !b

    )

        return null;



    return {


        sizeDifference:

        a.size -

        b.size,



        versionDifference:

        a.version -

        b.version



    };


}



// --------------------------------------
// 全バックアップ
// --------------------------------------

export function getBackups(){


    return backups;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestBackup(){


    return backups[

        backups.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getBackupAIInfo(){


    return {


        name:

        "Backup AI",



        version:

        "1.0",



        backups:

        backups.length


    };


}
