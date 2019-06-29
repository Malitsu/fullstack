import React from 'react'

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
  
  export default Course