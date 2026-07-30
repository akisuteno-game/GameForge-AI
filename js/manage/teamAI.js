// ======================================
// GameForge AI
// teamAI.js
// Development Team Management AI
// ======================================



const TEAM_KEY =

    "gameforge-team-history-v1";



let teams =

    loadTeams();



// --------------------------------------
// 読み込み
// --------------------------------------

function loadTeams(){


    const data =

        localStorage.getItem(

            TEAM_KEY

        );



    return data

        ? JSON.parse(data)

        : [];


}



// --------------------------------------
// 保存
// --------------------------------------

function saveTeams(){


    localStorage.setItem(

        TEAM_KEY,

        JSON.stringify(

            teams

        )

    );


}



// --------------------------------------
// チーム作成
// --------------------------------------

export function createTeam({

    name="Game Team"

}){


    const team={


        id:

        "team_"

        +

        Date.now(),



        name,



        members:

        [],



        tasks:

        [],



        efficiency:

        100,



        created:

        Date.now()



    };



    teams.push(

        team

    );



    saveTeams();



    return team;


}



// --------------------------------------
// メンバー追加
// --------------------------------------

export function addMember(

    team,

    member

){


    const data={


        id:

        "member_"

        +

        Date.now(),



        name:

        member.name,



        role:

        member.role,



        skill:

        member.skill || 50,



        workload:

        0



    };



    team.members.push(

        data

    );



    saveTeams();



    return data;


}



// --------------------------------------
// 標準ゲーム開発チーム生成
// --------------------------------------

export function createGameDevTeam(){


    const team =

        createTeam({

            name:

            "GameForge Development Team"

        });



    const roles=[


        {

            name:

            "Game Designer",

            role:

            "design",

            skill:

            90

        },


        {

            name:

            "Programmer",

            role:

            "program",

            skill:

            95

        },


        {

            name:

            "Artist",

            role:

            "art",

            skill:

            85

        },


        {

            name:

            "Sound Creator",

            role:

            "sound",

            skill:

            80

        },


        {

            name:

            "QA Tester",

            role:

            "test",

            skill:

            85

        }


    ];



    roles.forEach(

        member=>{


            addMember(

                team,

                member

            );


        }

    );



    return team;


}



// --------------------------------------
// AI担当割り当て
// --------------------------------------

export function assignAITask({

    team,

    task

}){


    let best=null;



    team.members.forEach(

        member=>{


            if(

                member.role===task.category

            ){


                best=member;


            }


        }

    );



    if(!best){


        best=

        team.members[0];


    }



    best.workload += 10;



    team.tasks.push({


        task,



        assigned:

        best.name



    });



    saveTeams();



    return best;


}



// --------------------------------------
// 負荷分析
// --------------------------------------

export function analyzeWorkload(

    team

){


    return team.members.map(

        member=>({


            name:

            member.name,



            workload:

            member.workload,



            status:

            member.workload > 80

            ?

            "busy"

            :

            "normal"



        })

    );


}



// --------------------------------------
// 効率計算
// --------------------------------------

export function calculateEfficiency(

    team

){


    if(

        team.members.length===0

    )

        return 0;



    const total =

        team.members.reduce(

            (

                sum,

                m

            )=>

            sum+m.skill,

            0

        );



    return Math.floor(

        total /

        team.members.length

    );


}



// --------------------------------------
// チーム一覧
// --------------------------------------

export function getTeams(){


    return teams;


}



// --------------------------------------
// 最新
// --------------------------------------

export function getLatestTeam(){


    return teams[

        teams.length-1

    ];


}



// --------------------------------------
// 情報
// --------------------------------------

export function getTeamAIInfo(){


    return {


        name:

        "Team AI",



        version:

        "1.0",



        teams:

        teams.length


    };


}
