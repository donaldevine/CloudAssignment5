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

            if(!comments) return;

            const commentsDiv = document.getElementById('comments');

            commentsDiv.innerHTML = '';

            let i = 0;

            let markupToAdd = '';

            comments.forEach((item, index) =>
            {
                let rowStart = '';
                let rowEnd = '';

                if(index === 0)
                {
                    rowStart = "<div class='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4'>";
                }

                if(index > 0 && index % 4 === 0)
                {
                    rowStart = "</div><div class='row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4'>";
                }

                if(index === comments.length)
                {
                    rowEnd = "</div>";
                }

                const markup = `
                    ${rowStart}
                    <div class="col">
                        <div class="card box-shadow">
                         <h5 class="card-header">Comment</h5>
                          <div class="card-body">
                            <h5 class="card-title">Comment</h5>
                            <p class="card-text">${item.comment}</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>                        
                          </div>
                        </div>                
                    </div>
                    ${rowEnd}
                `;

                markupToAdd += markup;

            });

            commentsDiv.innerHTML += markupToAdd;
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
            comment.value = '';
        });
    }
});

