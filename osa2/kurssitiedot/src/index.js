import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({name}) => {
    return (
        <h1>{name}</h1>
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
    let sum = parts[0].exercises + parts[1].exercises + parts[2].exercises
    return (
        <p><b>total of {sum} exercises</b></p>
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
    const course = {
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
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

/*
const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
      ]
    }
  
    return (
        <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
    )
}
*/

ReactDOM.render(<App />, document.getElementById('root'));