// Adding photo
const fileSelector = document.getElementById("addImg");
fileSelector.addEventListener("change", (event) => {
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    let newImg = document.createElement("img");

    newImg.src = event.target.result;

    //document.getElementById("blog-editor").appendChild(newImg);

    pasteImgAtCaret(newImg);
  });
  //console.log("ScrollTop "+document.getElementById('blog-editor').scrollTop);
  reader.readAsDataURL(event.target.files[0]);
});
// Submit
const submitSelector = document.getElementById("submit");
submitSelector.addEventListener("click", async () => {
  let blog = document.getElementById("blog-editor");
  let blogTitle=document.getElementById('blog-title').value
  console.log(blogTitle);
  let imgs = blog.getElementsByTagName("img");
  for (let i = 0; i < imgs.length; i++) {
    let img1 = new FormData();
    const file = dataURLtoFile(imgs[i].src, "testimg.png");
    img1.append("file", file);
    let res = await fetch("http://localhost:3000/blog/uploadPhoto", {
      method: "POST",
      body: img1,
    });

    res = await res.json();
    // console.log(res.filename);
    imgs[i].src = res.filename;
    //console.log(imgs[i].src);
  }

  let res = await fetch("http://localhost:3000/blog/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title:blogTitle,content: blog.innerHTML} ),
  });
  res = await res.json();
  if(res.success){
    alert("Submitted successfully!")
    location.assign("/blog/all")
  }
  //console.log(res);
});

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
