
// Adding photo
const fileSelector = document.getElementById("addImg");
fileSelector.addEventListener("change", (event) => {
  const reader = new FileReader();
  reader.addEventListener("load", (event) => {
    let newImg = document.createElement("img");

    newImg.src = event.target.result;

    document.getElementById("blog-editor").appendChild(newImg);
  });
  reader.readAsDataURL(event.target.files[0]);
});
// Submit
const submitSelector = document.getElementById("submit");
submitSelector.addEventListener("click", async () => {
  let blog = document.getElementById("blog-editor");
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
    console.log(res.filename);
    imgs[i].src = res.filename;
    console.log(imgs[i].src);
  }

  await fetch("http://localhost:3000/blog/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: blog.innerHTML }),
  });
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
