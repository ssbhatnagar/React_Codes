import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'

export default function Home() {
  const projects = [
    { name: 'Todo App', path: '/todoapp' },
    { name: 'Calculator', path: '/calculator' },
    { name: 'Password Generator', path: '/password-generator' },
    { name: 'Weather App', path: '/weather' },
    { name: 'API Calling', path: '/api-calling' },
    {name: 'TwitterClone', path: '/twitter'},
    {name: 'FilterAPIData', path: '/filter'},
    {name: 'CartProject', path: '/cart'},
    {name: 'Timer', path: '/timer'},
    {name: 'Form', path: '/form'},
    {name: 'BgColorChanger', path: '/color'},
    {name: 'Star Rating', path:'/star'},
    {name: 'Progress Bar', path:'/progress'},
    {name: 'Tic Tac Toe', path: '/tictactoe'},
    {name: 'Input Types', path: '/input'},
    {name: 'Filter Basic', path: '/filterbasic'},
    {name: 'Modal', path: '/Modal'},
    {name: 'SearchBar', path: '/search'},
    {name: 'Tab Form', path:'/tab'},
    {name: 'Pagination', path: '/pagination'},
    {name: 'Tab Form Config', path: '/tabformconfig'},
    {name: 'File Folder Structure', path: '/folderstructure'},
    {name: 'Nested Replies', path: '/nestedreplies'},
    {name: 'Nested Twitter Clone', path: '/nestedtweets'},
    {name: 'Accordian', path: '/accordian'}
  ]

  return (
    <div className={styles['home-container']}> {/* styles use karein */}
      <h1>React Practice Projects</h1>
      <p>Select a project to get started</p>
      <div className={styles['projects-grid']}>
        {projects.map((project) => (
          <Link key={project.path} to={project.path} className={styles['project-card']}>
            <h2>{project.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
