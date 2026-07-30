// ======================================
// GameForge AI
// projectUI.js
// Project Management UI
// ======================================



import {

    getBuildHistory,

    getLatestBuild,

    buildProject

} from "./projectBuilder.js";



import {

    runTest

} from "./tester.js";





let selectedProject = null;



// --------------------------------------
// プロジェクト一覧表示
// --------------------------------------

export function renderProjectList(

    elementId="projectList"

){


    const area =

        document.getElementById(

            elementId

        );



    if(!area){

        return;

    }



    area.innerHTML="";



    const projects =

        getBuildHistory();



    projects.forEach(

        project=>{


            const card =

            document.createElement(

                "div"

            );



            card.className=

                "project-card";



            card.innerHTML=

`

<h3>

${project.name}

</h3>


<p>

状態:

${project.status}

</p>


<p>

作成:

${new Date(

project.created

)

.toLocaleString()}

</p>

`;



            card.onclick=()=>{


                selectProject(

                    project.id

                );


            };



            area.appendChild(

                card

            );


        }

    );


}



// --------------------------------------
// プロジェクト選択
// --------------------------------------

export function selectProject(

    id

){


    const project =

        getBuildHistory()

        .find(

            p=>

            p.id===id

        );



    if(!project){

        return null;

    }



    selectedProject =

        project;



    renderProjectDetail(

        project

    );



    return project;


}



// --------------------------------------
// 詳細表示
// --------------------------------------

export function renderProjectDetail(

    project,

    elementId="projectDetail"

){


    const area =

        document.getElementById(

            elementId

        );



    if(!area){

        return;

    }



    const progress =

        Math.min(

            100,

            project.steps.length *

            20

        );



    area.innerHTML=

`

<h2>

${project.name}

</h2>


<p>

ジャンル:

${project.genre.join(", ")}

</p>


<p>

進行度:

${progress}%

</p>



<h3>

制作工程

</h3>


<ul>

${project.steps

.map(

step=>

`<li>${step}</li>`

)

.join("")}

</ul>

`;



}



// --------------------------------------
// 新規ゲーム作成
// --------------------------------------

export function createNewProject({

    name,

    genre

}){


    const project =

        buildProject({

            name,

            genre

        });



    renderProjectList();



    return project;


}



// --------------------------------------
// 最新プロジェクト表示
// --------------------------------------

export function showLatestProject(){


    const project =

        getLatestBuild();



    if(project){


        selectProject(

            project.id

        );


    }



    return project;


}



// --------------------------------------
// ビルド実行
// --------------------------------------

export function buildButtonAction(){


    if(!selectedProject){

        return false;

    }



    selectedProject.status=

        "building";



    return true;


}



// --------------------------------------
// テスト実行
// --------------------------------------

export function testProject(){


    return runTest();


}



// --------------------------------------
// 初期化
// --------------------------------------

export function setupProjectUI(){


    renderProjectList();



    showLatestProject();


}



// --------------------------------------
// 情報
// --------------------------------------

export function getProjectUIInfo(){


    return {


        name:

        "GameForge Project UI",



        version:

        "1.0",



        selected:

        selectedProject

        ?

        selectedProject.name

        :

        null


    };


}
