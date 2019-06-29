import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => {
    return (
        <h2>{name}</h2>
    )
}

const Content = ({parts}) => {
    const rows = () => parts.map(part => 
        <Part
            key={part.id}
            part={part}
        />
    )

    return (
        <div>
            {rows()}
        </div>  
    )
}

const Part = ({part}) => {
  return (
      <p>
          {part.name.toString()} {part.exercises}
      </p>
  )
}

const Total = ({parts}) => {

    const total = () =>
      parts.reduce( (acc, part) => {
      return acc + part.exercises
    }, 0)
    
    return (
        <p><b>total of {total()} exercises</b></p>
    )
}

const Course = ({course}) => {
    return (
        <div>
          <Header name={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} /> 
        </div>
    )
}

const App = () => {

    const courses = [
      {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10,
            id: 1
          },
          {
            name: 'Using props to pass data',
            exercises: 7,
            id: 2
          },
          {
            name: 'State of a component',
            exercises: 14,
            id: 3
          },
          {
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]
  
    return (
      <div>
        <h1>Web development curriculum</h1>
        <Course course={courses[0]} />
        <Course course={courses[1]} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));