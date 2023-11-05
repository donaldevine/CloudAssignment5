//const functionsBaseUrl = "https://us-central1-assignment5-23205918.cloudfunctions.net/"
const functionsBaseUrl = "http://127.0.0.1:5001/assignment5-23205918/us-central1/"

async function getComments() {
    const response = await fetch(functionsBaseUrl + "getcomments");
    const comments = await response.json();
    console.log(comments);
    return comments;
}

async function postComment(data) {
    try {
        const response = await fetch(functionsBaseUrl + "postcomments", {
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

var loadComments = function () {
    getComments().then((comments) =>
        {
            console.log(comments);
        }
    )
};


var comment = document.getElementById("comment");

comment.addEventListener("input", (e) => {
    let counter = document.getElementById("counter");
    const maxLength = 280;
    let currentLength = 0;
    let remaining = 0;

    if (e.target.value) currentLength = e.target.value.length;

    remaining = maxLength - currentLength;

    counter.innerText = remaining;
});

var commentsForm = document.getElementById("commentsForm");

commentsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let comment = document.getElementById("comment");

    if (comment.value){
        
        let data = {
            name: "comment",
            comment: comment.value
        }

        postComment(data).then(r => {
            loadComments();
        });
    }
});

