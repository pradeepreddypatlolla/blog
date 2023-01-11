document.getElementById("register").addEventListener('click',async(e)=>{
    e.preventDefault()

    let form=document.getElementById('registerForm')
    
    let name=form.name.value
    let emailId=form.email.value
    let password=form.password.value 
    console.log(name,emailId,password)   
    let res=await fetch(location.origin+'/user/register',{
        method:'POST',
        headers:{
            "Content-Type":'application/json'
        },
        body:JSON.stringify({name:name,emailId:emailId,password:password})
    })

    res=await res.json()
    alert(res.message)
    if(res.sucess){
        
        location.assign('/blog/all')
    }
    
    console.log(res);
})
