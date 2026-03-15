import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

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
    {name: 'SearchBar', path: '/search'}
  ]

  return (
    <div className="home-container">
      <h1>React Practice Projects</h1>
      <p>Select a project to get started</p>
      <div className="projects-grid">
        {projects.map((project) => (
          <Link key={project.path} to={project.path} className="project-card">
            <h2>{project.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  )
}
