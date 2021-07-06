# About credentials

We use some keys and kinda credentials for this service.  
However, all of keys in this repository is ok to be public.  

## creds
These information includes:
- microCMS
  - URI of API
  - API key: needed to fetch data. The data contains only public information such as challenge description and scores.
- Firebase Project
  - API key, auth domain, project ID, storage bucket, messaging sender ID, and app ID.
  - These are recognized as public information by Google.
    - https://firebase.google.com/docs/projects/learn-more?hl=ja
  - In other words, Firestore should be designed to be robust against malcious requests. In this project, access to the DB is controled by security rule, where almost all access is prohibited and only admin can access.
- Github
  - The only secrets of Github is Github Webhook Secret. It shouldn't be leaked theoretically ofcourse. However, even if it is leaked, the only effect is that someone can force the scoreserver to restart.

## handling
  Even if they are ok to be public, it is preferable to hide these information from this repository. Hence, these information should be packed into `.env` file (It is ok for these information to be packed into distributed files from server. it's the nature of Nuxt).
