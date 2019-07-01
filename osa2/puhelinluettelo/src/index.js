import ReactDOM from 'react-dom';
import React, { useState } from 'react'

const Person = ({person}) => {
    return (
        <p>{person.name.toString()} {person.number.toString()}</p>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '123 123', id: 0 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addPerson= (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
        important: Math.random() > 0.5,
        id: newName
      }
      setNewName('')
      setNewNumber('')
      if (persons.filter(person => person.name === newName).length > 0){
          window.alert(`${newName} is already added to phonebook`)
      }
      else {
        setPersons(persons.concat(personObject))
      }
  }

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
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
      <form onSubmit={addPerson}>
        <div>
          name: <input
                    value={newName}
                    onChange={handleNameChange}    
                />
        </div>
        <div>
            number: <input 
                        value={newNumber}
                        onChange={handleNumberChange}
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