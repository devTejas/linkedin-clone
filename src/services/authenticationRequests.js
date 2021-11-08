import { auth, db, storage } from "../firebaseConfig";

export const signIn = async (isGuest, email, password) => {
  try {
    if (isGuest) {
      email = "test@user.com";
      password = "testuser";
    }

    const { user } = await auth.signInWithEmailAndPassword(email, password);
    if (user) {
      // let userData = {};
      // const query = db.collection("users").where("email", "==", email);
      // await query.get().then((querySnapshot) => {
      //   querySnapshot.forEach((doc) => {
      //     console.log(doc.id, doc.data());
      //     userData = { userName: doc.id, ...doc.data() };
      //   });
      // });
      // return userData;
      return getUserDataByEmail(email, "signInfromAuthReq");
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

// export const signUp = async (
//   userName,
//   email,
//   password,
//   displayName,
//   file
// ) => {
// };

export const signUp = async (userName, email, password, displayName, file) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    let photoURL = "";
    if (file) {
      const fileRef = storage.ref(file.name);
      fileRef.put(file).then(async () => {
        photoURL = await fileRef.getDownloadURL();
      });
    }
    // await user.updateProfile({ displayName, photoURL });
    // creating a user in db/users
    const userData = {
      displayName,
      photoURL,
      email,
      status: "",
      description: "",
    };
    if (user) {
      await db.collection("users").doc(userName).set(userData);
      return { ...userData, userName };
    }
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const checkUserName = async (userName) => {
  const userData = await db.collection("users").doc(userName).get();

  if (userData.exists) return false;
  else return true;
};

export const getUserDataByEmail = async (email, whoCalled) => {
  console.log(whoCalled);
  try {
    let userData = {};
    const query = db.collection("users").where("email", "==", email);
    await query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        userData = { userName: doc.id, ...doc.data() };
      });
    });
    return userData;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// will be useful when user logins through username
export const getUserDataByUserName = (userName) => {};

export const updateUser = async (userData) => {
  console.log(userData);
  let message = "";
  await db
    .collection("users")
    .doc(userData.userName)
    .set({ ...userData })
    .then(() => {
      console.log("from then updateUser");
      message = "🎉Your changes are saved!🥳";
    })
    .catch((err) => {
      console.error(err);
      message = "😢There was an error while saving your changes!😢";
    });
  return message;
};

// since we are using dispatch we must make the function as Capital to show it as a component
export const DeleteUser = (userName) => {
  const user = auth.currentUser;
  user
    .delete()
    .then(() => {
      db.collection("users")
        .doc(userName)
        .delete()
        .then(() => {
          alert("User deleted!");
          window.location = "/";
        });
    })
    .catch((err) => alert(err.message));
};
