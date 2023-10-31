# Taskizy

Task management system with 'rooms' for exclusive task creation, better for team tasks.
Github Link for API: [taskizy-api](https://github.com/paofrencillo/taskizy-api)
<br/>
<br/>
![tzy](https://github.com/paofrencillo/taskizy/assets/66950460/38924f33-c244-4511-a67e-6871ab33b3d2)

Clone this repository
```
https://github.com/paofrencillo/taskizy.git
```

Go to working directorry and install dependencies
```
npm i
```

This repository has 3 branches
<br/>
```
|- main # used by vercel app for deploying this app
|- deployment
|- production
```

### Deployment

For vercel, create a vercel.json file on the working directory and paste this code (this was necessary to access URLs):
```
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

