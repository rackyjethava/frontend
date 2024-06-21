// 1. Count the total number of active users.

[
  {
    $match: {
      "isActive": true
    }
  },
  {
    $count: 'NoofActive'
  }
]
// 2. Find the average age of male and female.
[
  {
    $group: {
      _id: "$gender",
      "AvgAvg": {
        $avg: "$age"
      }
    }
  }
]
// 3. Give the total number of posts by active users.

[
  {
    $match: {
      "isActive": true
    }
  },
  {
    $unwind: {
      path: "$posts",
    }
  },
  {
    $group: {
      _id: "$_id",
      "noOfPost": {
        $sum: 1
      }
    }

  }
]
// 4. Count the total number of comments.

[
  {
    $unwind: {
      path: "$posts",
    }
  },
  {
    $project: {
      "comment": {
        $size: "$posts.comments"
      }
    }
  },
  {
    $group: {
      _id: "$_id",
      "totalcomment": {
        $sum: "$comment"
      }
    }
  }
]

// 5. List users and their total likes.
[
  {
    $unwind: {
      path: "$posts",
    }
  },
  {
    $group: {
      _id: "$_id",
      name: { $first: "$name" },
      "totalLike": {
        $sum: "$posts.likes"
      }
    }
  }
]
// 6. Find the user name with the maximum likes of posts.
[
  {
    $project: {
      name:1,
      totallike:{
        $sum:"$posts.likes"
      }
    }
  },
  {
    $sort: {
      totallike: -1
    }
  },
  {
    $limit: 1
  }
]
// 7. Count the number of active and inactive users.
[
  {
    $group: {
      _id: "$isActive",
      "isactive":{
        $first:"$isActive"
      },
      count: {
        $sum: 1
      }
    }
  },
  {
    $project: {
     _id:0
    }
  }
]
// 8. List the cities with the highest average age.

[
  {
    $group: {
      _id: "$city",
     "Avgavg":{
       $avg:"$age"
     }
    }
  },
  {
    $sort: {
      Avgavg: -1
    }
  },
  {
    $limit: 1
  }
]
// 9. Count the number of users in each city.
[
  {
    $group: {
      _id: "$city",
      count: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      city: "$_id",
      count: 1
    }
  }
]
// 10. Count the number of users with JavaScript skills.
[
  {
    $match: {
      skills: "JavaScript"
    }
  },
  {
    $count: "JavaScriptUsers"
  }
]
// 11. Count the number of users with each skill.

[
  {
    $unwind: {
      path: "$skills",
    }
  },
  {
    $group: {
      _id: "$skills",
      totaluser:{
        $sum:1
      }
      
    }
  }
]
// 12. Find users who have posts with more than 15 likes and a specific skill.

[
  {
    $unwind: {
      path: "$posts",
    }
  },
  {
    $match: {
      $and:[
        {"posts.likes":{$gt:15}},
        {"skills":"JavaScript"}
      ]
    }
  },
  {
    $group: {
      _id:"$_id",
      name:{$first:"$name"}
    }
  }
  
]
// 13. Find users with the highest total number of likes across all posts.
// 14. Find users who have friends and count the number of friends.
// 15. Find users who have at least one post with a specific comment and a specific skill.
// 16. Count users who have skills javascript and react.
// 17. count user who have second skills as React
// 18. Categorise users by their city and gives their id and name.
// 19. Give user data whose city name starts with "New".
// 20. Add a "postCount" field representing the total number of posts for each user.
// 21. Add a "friendNames" field with the names of friends for each user.
// 22. Display posts data that have more than 1 comments.