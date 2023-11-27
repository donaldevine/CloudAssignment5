/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const cors = require("cors")({origin: true});
const admin = require("firebase-admin");

initializeApp();

exports.getcomments = onRequest(async (request, response) => {
    logger.info("getcomments called", {structuredData: true});
    cors(request, response, async () => {
        const db = getFirestore();
        const comments = await db.collection("comments").get();

        if (comments.empty) {
            console.log ('No comments in database');
            response.send ('No comments in database');
            return;
        }
        const commentsData = comments.docs.map((doc) => doc.data());
        response.send(commentsData);
    });
});

exports.postcomments = onRequest(async (request, response) => {
    logger.info("postcomments called", {structuredData: true});

    cors(request, response, async () => {
        const db = getFirestore();
        const {name, comment} = request.body;
        const timestamp = admin.firestore.Timestamp.now();
        await db.collection("comments").add({ comment:comment, timestamp:timestamp });
        response.send('{"result" : "Comment added"}');
    });
});

