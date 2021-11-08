# TODO:

- Make Screen responsive
- Upload Video Input. Currently accept only 1. Later multiple. Try to have file validations as well!
- Fix LikeIcon-Value alignment. Also show if the post is liked!
- Try to make a menu for the header options
- Left & Right Sidebars

- Comment feature to be implemented

## Create

- [x] /login -> with sign in & signup included
- [] /profile -> update user profile -> Will be also helpful for seeing other person profile
  -- user can delete his profile from here only
- [] /:id -> other user profile with all his posts - have /:id as unique username
- [] /post -> for creating a new post
- [] /post/:id -> for seeing a post
- [] /article/:id for finding articles
- [] / -> home screen [app feed, Sidebars, header]
- [] /bookmarks or /saved

---

# Project Structure

- services -> for all async activities
- firebase -> for firebase init files
-

Add SignOut button - When user hovers over his image in header - SignOut must be shown!
User can delete his profile - Create /profile for update, deleting the profiles!

---

# updating post

- Can be done by going to a /post/:id only
- Actions like delete, edit can be done by author only.
- User can only like, comment!
- Author can update everything of the post!

---

# Routes

- /profile -> update user profile -> Will be also helpful for seeing other person profile
- /post/:id -> for seeing a post
- /bookmarks or /saved
- /:id -> user profile with all his posts

# OUR WAY

## Adding post to db

- Saving user name(postAuthor) instead of postAuthorId

---

# Tweeter by Shubham

- Save the user in firestore(db) when signup -> So we can retrieve user data, manage followers/following!
