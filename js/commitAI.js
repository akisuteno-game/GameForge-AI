// ======================================
// GameForge AI
// commitAI.js
// Automatic Commit Message AI
// ======================================



const COMMIT_KEY =

    "gameforge-commit-history-v1";



let commits =

    loadCommits();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadCommits(){


    const data =

        localStorage.getItem(

            COMMIT_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveCommits(){


    localStorage.setItem(

        COMMIT_KEY,

        JSON.stringify(

            commits

        )

    );


}



// --------------------------------------
// 変更分析
// --------------------------------------

export function analyzeChanges(

    files=[]

){


    const result={


        added:[],


        modified:[],


        removed:[]


    };



    files.forEach(

        file=>{


            if(

                file.type==="new"

            ){


                result.added.push(

                    file.path

                );


            }



            else if(

                file.type==="update"

            ){


                result.modified.push(

                    file.path

                );


            }



            else if(

                file.type==="delete"

            ){


                result.removed.push(

                    file.path

                );


            }


        }

    );



    return result;


}



// --------------------------------------
// コミット種類判定
// --------------------------------------

function detectType(

    changes

){


    if(

        changes.added.length

        >

        0

    ){

        return "feat";

    }



    if(

        changes.removed.length

        >

        0

    ){

        return "remove";

    }



    return "fix";


}



// --------------------------------------
// メッセージ生成
// --------------------------------------

export function generateCommitMessage(

    changes

){


    const type =

        detectType(

            changes

        );



    let target =

        "system";



    if(

        changes.added.length

    ){

        target =

        changes.added[0];

    }



    else if(

        changes.modified.length

    ){

        target =

        changes.modified[0];

    }



    return `${type}: improve ${target}`;


}



// --------------------------------------
// コミット作成
// --------------------------------------

export function createCommit({

    changes,

    message=null

}){


    const commit={


        id:

        "commit_"

        +

        Date.now(),



        type:

        detectType(

            changes

        ),



        message:

        message

        ||

        generateCommitMessage(

            changes

        ),



        changes,



        created:

        Date.now()


    };



    commits.push(

        commit

    );



    saveCommits();



    return commit;


}



// --------------------------------------
// 履歴取得
// --------------------------------------

export function getCommitHistory(){


    return commits;


}



// --------------------------------------
// 最新コミット
// --------------------------------------

export function getLatestCommit(){


    return commits[

        commits.length-1

    ];


}



// --------------------------------------
// 開発ログ生成
// --------------------------------------

export function createDevelopmentLog(){


    return commits.map(

        commit=>{


            return `

${new Date(

commit.created

)

.toLocaleString()}


${commit.message}

`;

        }

    )

    .join("\n");


}



// --------------------------------------
// 情報
// --------------------------------------

export function getCommitAIInfo(){


    return {


        name:

        "GameForge Commit AI",



        version:

        "1.0",



        commits:

        commits.length


    };


}
