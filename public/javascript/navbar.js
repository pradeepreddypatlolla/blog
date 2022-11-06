// fetch('../../views/navbar.html').then(res=>res.text()).
// then(res=>document.getElementById('navbar').innerHTML=res).
// then(()=>{
//     toggleNavbar()
//     document.getElementById("logout").addEventListener('click',()=>{
//         localStorage.clear()

        
//         toggleNavbar()
      
        
//     })
// })


//  function toggleNavbar(){
//     let email=localStorage.getItem("email")
//    // alert(email)
//     if(email){
//        let login= document.getElementById("login-signup")
//        let logout= document.getElementById("logout-username")
//        login.style.display='none'
//        logout.style.display='block'
//       // logout.getElementById('username').innerHTML=email
//     //  alert("heello")
//        document.getElementById('username').innerHTML=email
//     }
//     else{
//     console.log(document.getElementById("logout-username"))

//        // document.getElementById("login-singup").style.display='block'
//         document.getElementById("logout-username").style.display='none'
        
//     }
// }

const toggleNavbar=function(){ 
    let email=localStorage.getItem('email')
  if(email){ 
  let login= document.getElementById("login-signup") 
  let logout=document.getElementById("logout-username") 
  login.style.display='none'
 // logout.style.display='block' 
  document.getElementById('username').innerHTML=email 
  } 
  else{ // alert(email)
  //document.getElementById('login-signup').style.display='block'
  document.getElementById('logout-username').style.display='none'
   } 
   }
  toggleNavbar()
  document.getElementById("logout").addEventListener('click',()=>{
  localStorage.clear() 
  toggleNavbar() })


  document.getElementById("menuicon").addEventListener("click", () => {
    let menu = document.getElementById("navlinks");
    console.log("Hello");
    menu.classList.toggle("active");
  });




