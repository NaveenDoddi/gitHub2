import React, { useState } from "react";

function Repos(repos){
    var [loading, setLoading] = useState(false)
    var [data, setData] = useState("")
    async function run(){
        try{
        
            await fetch(repos.link)
            .then(response => response.json())
            .then((data)=> {
                setData(data)
                sessionStorage.setItem("reposData", JSON.stringify(data))
                setLoading(true)
            })
        }catch(error){}
    }
    
    run()

    function showRepos(){
        if(loading){
            var dropdownMenu = document.querySelector("#dropdown1");
            dropdownMenu.classList.toggle("show");
        }
        
    }

    return(
        <>
        <div className="dropdown">

        <button className="btn btn-success w-100 dropdown-toggle" id="dropdownMenuButton" data-toggle="dropdown" onClick={showRepos}> Reposetries {repos.count}</button>
        {loading && 
        
        <div className="dropdown-menu bg-dark" id="dropdown1" aria-labelledby="dropdownMenuButton" style={{height:"500px",overflow:"scroll", border:"none"}}>
            {data.map((i)=>
                <>
                <div className="dropdown-item text-dark">
                    <table className="table table-borderless">
                        <tr>
                            <td><a target="_blank" href={"https://"+i.owner.login+".github.io/"+i.name}> {i.name} </a> </td>
                            <td style={{textAlign :"right"}}>Lang: {i.language}</td>
                        </tr>
                        <tr>
                            <td>Branch</td>
                            <td style={{textAlign :"right"}}>{i.default_branch}</td>
                        </tr>
                        <tr>
                            <td>latest push on</td>
                            <td style={{textAlign :"right"}}>{i.pushed_at.split("T")[1].split("Z")[0]}, {i.pushed_at.split("T")[0]}</td>
                        </tr>
                        <tr>
                            <td>created at</td>
                            <td style={{textAlign :"right"}}>{i.created_at.split("T")[1].split("Z")[0]}, {i.created_at.split("T")[0]}</td>

                        </tr>
                    </table>
                </div>
                </>
            )}
        </div>
        }
        </div>
        </>

    )
    
}

export default Repos