document.getElementById('comment-submit').addEventListener('click',async function(e){
   // alert("Comment started")
    let comment=document.getElementById("comment").value
    alert(comment)
    let blogId=localStorage.getItem('blogId')
   // alert(blogId)
    let res=await fetch('http://localhost:3000/blog/commentsubmit',{
        method:'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify({blogId:blogId ,comment:comment})
    })
    res=await res.json()
    if(res.success){
        alert("Comment added")
        location.reload(true)
    }
    else{
        alert(res.message)
    }

})

// async function commentSubmit(blogId){
//     alert("Comment started")
//     let comment=document.getElementById("comment").innerText
//    // let blogId=localStorage.getItem('blogId')
//     alert(blogId)
//     let res=await fetch('http://localhost:3000/blog/commentsubmit',{
//         method:'POST',
//         body:JSON.stringify({blogId:blogId ,comment:comment})
//     })
//     res=await res.json()
//     if(res.success){
//         alert("Comment added")
//     }
// }