import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

//   // 1A
//   function addItem(){
//     setCart((prev) =>
//     [...prev, {id: 2, name: "Jeans", price: 1000, qty: 1}  ]
//     )
//   }

//   // 1B
//   function increaseQty(index){
//     setCart((prev) => 
//       prev.map((item) => 
//         item.id === index ? {...item, qty: item.qty + 1} : item 
//       )
//     )
//   }

//   // 1C
//   function deleteItem(index){
//     setCart((prev) =>
//       prev.filter((item) => item.id !== index)
//     )
//   }


//   // 2A
//   function updateAndAdd(){
//     setProfile((prev) => (
//     {
//       ...prev,
//       age: 28,
//       skills: [...prev.skills, "react"]
//     }
//   )
//     )
//   }

//   // 2B
//   function deleteSkills(skill){
//     setProfile((prev) => (
//       { 
//         ...prev,
//       skills: prev.skills.filter((s) => s !== skill)
//       }
//     ))
//   }

// // 3A
// function updatePushMessage(){
//   setSettings((prev) => (
//     {
//       ...prev,
//       notification: {
//         ...prev.notification,
//         pushMessage: true
//       }
//     }
//   ))
// }

// // 3B
// function addProperty(){
//   setSettings((prev)=>(
//     {
//       ...prev,
//       notification: {
//         ...prev.notification,
//         sms: true
//       }
//     }
//   )
//   )
// }

// // 4A in know ye galat hai but isko maine niche theek kiya hai but kya ye theek ho sakta hai aur galat hai to kyu galat hai?
// function updateLikes(index){
//   setTweets((prev) =>(
//     prev.map((tweet) => (
//        tweet.id === index ? 
//        {
//         ...tweet, 
//         replies: tweet.replies.map((rep) =>
//           rep.id === replyId ?
//         {...rep, isLiked:true} : rep
//         )
//        }
//        : tweet
//     ))
//   )
//   )
// }

// // 4A hint baad mai padha but mujhe nahi aaya ye 
// function updateLikes(index){
//   setTweets((prev) =>(
//     prev.map((tweet) => (
//        tweet.id === index ? {...tweet } : tweet
//     ))
//   )
//   )
// }




  return (

    // CODE 1 
    // <div className="profile-card">
    //   <h1 className="user-name">Shubham Bhatnagar</h1>
    //   <p className="user-bio">Frontend Developer | Learning CSS</p>
    //   <button className="contact-btn">Contact Me</button>
    // </div>

    // CODE 2

    <nav className="navbar">
  <div className="logo">MyBrand</div>
  <ul className="nav-links">
    <li className="nav-item">Home</li>
    <li className="nav-item">About</li>
    <li className="nav-item">Contact</li>
  </ul>
</nav>

// CODE 3

/* <div className="profile-card">
  <span className="pro-badge">PRO</span>
  <h1 className="user-name">Shubham Bhatnagar</h1>
  <p className="user-bio">Frontend Developer | Learning CSS</p>
  <button className="contact-btn">Contact Me</button>
</div> */

)
}

export default App
