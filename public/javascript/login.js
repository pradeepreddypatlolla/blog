
document.getElementById("submit").addEventListener("click",async function(e){
   // alert("Logged in")
   e.preventDefault()
    const emailId=document.getElementById('email').value
    const password=document.getElementById('password').value
    let options={
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailId: emailId,password:password }),
      }
    fetch("http://localhost:3000/user/login",options).
   then(res=>res.json()).
   then(res=>{
    if(res.success){
      location.assign('/blog/all')
      localStorage.setItem('email',res.user.emailId)
    }
    else{
      alert(res.message)
    }
   })
   //  console.log(res)

  //   res=await res.json()
  //  // alert(history.go('/blog'))
    
  //   localStorage.setItem("email",res.user.emailId)
  //   window.location.replace('/blog/editor')
    
   // console.log(res);
})