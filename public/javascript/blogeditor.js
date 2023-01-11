// Adding photo
const fileSelector = document.getElementById("addImg");
fileSelector.addEventListener("change", (event) => {
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    let newImg = document.createElement("img");

    newImg.src = event.target.result;

    

    pasteImgAtCaret(newImg);
  });
  
  reader.readAsDataURL(event.target.files[0]);
});

// Submit 

const submit=async(blogId)=>{
  document.getElementById('loader').style.display='block'
  console.log(blogId);
  let blog = document.getElementById('blog-editor');
  console.log(blog);
  let blogTitle=document.getElementById('blog-title').value
  console.log(blogTitle);
  let imgs = blog.getElementsByTagName('img');
  let imgUrls=[]
  for (let i = 0; i < imgs.length; i++) {
    
    if(imgs[i].src.startsWith('data')){

    
    let res = await fetch("http://localhost:3000/blog/uploadPhoto", {
      method: "POST",
      body: JSON.stringify({data: imgs[i].src}),
      headers:{'Content-type':'application/json'}
    });
   

    
    res = await res.json();
    console.log(res);
    
    imgs[i].src = res.url;
    imgUrls.push(res.url)
    
  }
  else{
    imgUrls.push(imgs[i].src)
  }
  }

  let res = await fetch("http://localhost:3000/blog/update-blog", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({blogId:blogId ,title:blogTitle,content: blog.innerHTML,imgUrls:imgUrls} ),
  });
  res = await res.json();
  if(res.success){
    alert("Submitted successfully!")
    document.getElementById('loader').style.display='none'
    location.assign("/blog/all")
  }
  console.log(res);
}



// convert base64 to file
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1; // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime });
};

// Add image at cursor position

function pasteImgAtCaret(newImg) {
  var sel, range;
  //console.log(window.getSelection());
  if (window.getSelection) {
    // IE9 and non-IE

    sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      console.log("hello");
      range = sel.getRangeAt(0);
      range.deleteContents();

      // Range.createContextualFragment() would be useful here but is
      // non-standard and not supported in all browsers (IE9, for one)
      var el = document.createElement("div");
      el.appendChild(newImg);
      var frag = document.createDocumentFragment(),
        node,
        lastNode;

      while ((node = el.firstChild)) {
        console.log("while");
        lastNode = frag.appendChild(node);
      }
      range.insertNode(frag);

      // Preserve the selection
      if (lastNode) {
        range = range.cloneRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  } else if (document.selection && document.selection.type != "Control") {
    // IE < 9
    console.log("IE ");
    document.selection.createRange().pasteHTML(html);
  }
}
