async function getComments() {
    const response = await fetch("https://us-central1-assignment5-23205918.cloudfunctions.net/getcomments");
    const movies = await response.json();
    console.log(movies);
}

async function postComment(data) {
    try {
        const response = await fetch("https://us-central1-assignment5-23205918.cloudfunctions.net/postcomments", {
            method: "POST", // or 'PUT'
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error:", error);
    }
}


var commentsForm = document.getElementById("commentsForm");

commentsForm.addEventListener("submit", (e) => {
   e.preventDefault();

   let comment = document.getElementById("comment");

   if (comment.value){
       postComment(comment);
   }
});