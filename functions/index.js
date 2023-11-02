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

initializeApp();

exports.getcomments = onRequest(async (request, response) => {
    logger.info("getcomments called", {structuredData: true});
    const db = getFirestore();
    const comments = await db.collection("comments").get();
    const commentsData = comments.docs.map((doc) => doc.data());
    response.send(commentsData);
});

exports.postcomments = onRequest(async (request, response) => {
    logger.info("postcomments called", {structuredData: true});
    const db = getFirestore();
    const {name, comment} = request.body;
    await db.collection("comments").add({name, comment});
    response.send("Comment added");
});


// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
