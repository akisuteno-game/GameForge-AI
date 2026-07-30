// ======================================
// GameForge AI
// dashboard.js
// AI Control Dashboard
// ======================================



import {

    getModelInfo

} from "./model.js";



import {

    getMessages

} from "./chatUI.js";



import {

    getBuildHistory

} from "./projectBuilder.js";



import {

    getTestHistory

} from "./tester.js";



import {

    getFixHistory

} from "./bugFixer.js";





// --------------------------------------
// ダッシュボードデータ取得
// --------------------------------------

export function getDashboardData(){


    const model =

        getModelInfo();



    const projects =

        getBuildHistory();



    const tests =

        getTestHistory();



    const fixes =

        getFixHistory();



    const chats =

        getMessages();



    return {


        ai:{


            name:

            model.name,


            level:

            model.level,


            mode:

            model.mode,


            power:

            model.power


        },



        stats:{


            projects:

            projects.length,



            chats:

            chats.length,



            tests:

            tests.length,



            fixes:

            fixes.length


        }



    };


}



// --------------------------------------
// 描画
// --------------------------------------

export function renderDashboard(

    elementId="dashboard"

){


    const area =

        document.getElementById(

            elementId

        );



    if(!area){

        return;

    }



    const data =

        getDashboardData();



    area.innerHTML=

`

<div class="dashboard-card">


<h2>

🧠 ${data.ai.name}

</h2>


<p>

Level:

${data.ai.level}

</p>


<p>

Mode:

${data.ai.mode}

</p>


<p>

Power:

${data.ai.power}%

</p>


</div>



<div class="dashboard-card">


<h3>

📊 Development Stats

</h3>


<p>

🎮 Projects:

${data.stats.projects}

</p>


<p>

💬 Chats:

${data.stats.chats}

</p>


<p>

🧪 Tests:

${data.stats.tests}

</p>


<p>

🐛 Fixes:

${data.stats.fixes}

</p>


</div>

`;



}



// --------------------------------------
// AI状態評価
// --------------------------------------

export function evaluateAI(){


    const data =

        getDashboardData();



    let rank =

        "Beginner";



    if(

        data.ai.power >= 80

    ){

        rank=

        "Master Developer";

    }



    else if(

        data.ai.power >= 50

    ){

        rank=

        "Developer";

    }



    return {


        rank,


        power:

        data.ai.power


    };


}



// --------------------------------------
// 開発進行率
// --------------------------------------

export function calculateProgress(){


    const data =

        getDashboardData();



    let score=0;



    score +=

        data.stats.projects *

        10;



    score +=

        data.stats.tests *

        2;



    score +=

        data.stats.fixes;



    return Math.min(

        100,

        score

    );


}



// --------------------------------------
// 更新
// --------------------------------------

export function refreshDashboard(){


    renderDashboard();


}



// --------------------------------------
// 情報
// --------------------------------------

export function getDashboardInfo(){


    return {


        name:

        "GameForge Dashboard AI",



        version:

        "1.0"



    };


}
