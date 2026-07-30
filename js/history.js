// ======================================
// GameForge AI
// history.js
// Commit History Manager
// ======================================


import {
    getCommits
} from "./git.js";



// --------------------------------------
// 履歴取得
// --------------------------------------

export function getHistory(){


    return getCommits()

        .sort(

            (a,b)=>

            b.time-a.time

        );


}



// --------------------------------------
// 最新履歴
// --------------------------------------

export function getLatest(

    count=10

){


    return getHistory()

        .slice(

            0,

            count

        );


}



// --------------------------------------
// ID検索
// --------------------------------------

export function findCommit(

    id

){


    return getHistory()

        .find(

            commit=>

            commit.id===id

        );


}



// --------------------------------------
// メッセージ検索
// --------------------------------------

export function searchHistory(

    keyword

){


    keyword =

        keyword.toLowerCase();



    return getHistory()

        .filter(

            commit=>


            commit.message

            .toLowerCase()

            .includes(

                keyword

            )

            ||

            commit.files.some(

                file=>

                file

                .toLowerCase()

                .includes(

                    keyword

                )

            )

        );


}



// --------------------------------------
// ファイル変更履歴
// --------------------------------------

export function getFileHistory(

    path

){


    return getHistory()

        .filter(

            commit=>

            commit.files.includes(

                path

            )

        );


}



// --------------------------------------
// タイムライン生成
// --------------------------------------

export function createTimeline(){


    return getHistory()

        .map(

            commit=>({


                id:

                    commit.id,


                message:

                    commit.message,


                files:

                    commit.files,


                date:

                    new Date(

                        commit.time

                    )

                    .toLocaleString()


            })

        );


}



// --------------------------------------
// AI用履歴まとめ
// --------------------------------------

export function buildHistoryContext(

    limit=20

){


    const history =

        getLatest(

            limit

        );



    let text =

        "# Development History\n\n";



    history.forEach(

        commit=>{


            text +=

`
## ${commit.message}

Files:

${commit.files.join(
    ", "
)}

Date:

${new Date(
    commit.time
)
.toLocaleString()}


`;

        }

    );



    return text;


}



// --------------------------------------
// 統計
// --------------------------------------

export function getHistoryStats(){


    const history =

        getHistory();



    return {


        commits:

            history.length,


        latest:

            history[0] || null


    };


}



// --------------------------------------
// 情報
// --------------------------------------

export function getHistoryInfo(){


    return {


        name:

        "GameForge History Manager",


        version:

        "1.0"


    };


}
