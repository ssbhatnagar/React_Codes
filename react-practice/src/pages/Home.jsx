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
    {name: 'twitterClone', path: '/twitter'},
    {name: 'FilterAPIData', path: '/filter'}
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
