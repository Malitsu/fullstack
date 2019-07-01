import ReactDOM from 'react-dom';
import React, { useState } from 'react'

const Person = ({person}) => {
    return (
        <p>{person.name.toString()}</p>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', id: 0 }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        date: new Date().toISOString(),
        important: Math.random() > 0.5,
        id: persons.length + 1,
      }
      
      setPersons(persons.concat(personObject))
      setNewName('')
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const rows = () => persons.map(person =>
        <Person
            key={person.id}
            person={person}
        />
    )

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
                    value={newName}
                    onChange={handleNameChange}    
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <div>
            {rows()}
        </div>
    </div>
  )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'));