import * as firebase from "firebase";
import _ from "lodash";
require("firebase/firestore");

export function addUser(userEmail) {
  firebase
    .firestore()
    .collection("user_score")
    .add({
      email: _.toLower(userEmail),
      score: 0,
    })
    .catch((error) => console.log(error));
}

export async function getUserScore(userRetrieved, email) {
  var user = [];

  var snapshot = await firebase
    .firestore()
    .collection("user_score")
    .where("email", "==", email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        user = doc.data();
      });
    });

  userRetrieved(user.score);
}

export async function getQuestions(questionsRetrieved) {
  var questionList = [];

  var snapshot = await firebase.firestore().collection("questions").get();

  snapshot.forEach((res) => {
    questionList.push(Object.assign({ uid: res.id }, res.data()));
  });

  const shuffled = questionList.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 10); // here declare we how many random questions we want to show
  questionsRetrieved(selected);
}

export async function getUsers(usersRetrieved) {
  var userList = [];

  var snapshot = await firebase
    .firestore()
    .collection("user_score")
    .orderBy("score")
    .get();

  snapshot.forEach((res) => {
    userList.push(Object.assign({ uid: res.id }, res.data()));
  });
  userList = _.orderBy(userList, [(data) => data.score], ["desc"]);

  console.log(userList);
  usersRetrieved(userList);
}

export async function addScore(email, newScore) {
  var user = {};
  console.log("222");
  console.log(email, newScore);

  var snapshot = await firebase
    .firestore()
    .collection("user_score")
    .where("email", "==", email)
    .get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        user = Object.assign({ uid: doc.id }, doc.data());
      });
    });
  console.log("user id ->", user.uid);

  firebase
    .firestore()
    .collection("user_score")
    .doc(user.uid)
    .update({
      score: firebase.firestore.FieldValue.increment(newScore),
    })
    .catch((error) => console.log(error));
}
