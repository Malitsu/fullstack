import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({person, handleDelete}) => {
  const removePerson = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${person.name} ?`)) { 
      personService
      .remove(person.id)
      .then( () => {
        handleDelete()
      })
    }
  }

    return (
      <p>
        {person.name.toString()} {person.number.toString()}
        <button onClick={removePerson} >delete</button>
      </p>
    )
}

const Persons = ({persons, search, handleDelete}) => {

  const personsToShow = (search === '')
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const rows = () => personsToShow.map(person =>
      <Person
          key={person.name}
          person={person}
          handleDelete={handleDelete}
      />
  )

  return (
    <div>
      {rows()}
    </div>
  )
}

const Filter = ({search, setSearch}) => {
    const handleSearchChange = (event) => {
      setSearch(event.target.value)
    }

    return (
      <form>
          filter shown with:    <input
                                    value={search}
                                    onChange={handleSearchChange}    
                                />
      </form>
    )
}

const PersonForm = ({persons, newName, newNumber, handleNameChange, handleNumberChange, addPerson}) => {

    return (
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
        <button type="submit">add</button>
    </form>
    )
}

const App = () => {

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

  const handleNameChange = (event) => {
      setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
  }

  const handleDelete = () => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }

  const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
        important: Math.random() > 0.5
      }
      if (persons.filter(person => person.name === newName).length > 0){
          window.alert(`${newName} is already added to phonebook`)
      }
      else {
        personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')          
        })
      }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
          search={search}
          setSearch={setSearch}
      />
      <h2>add a new</h2>
      <PersonForm
          persons={persons}
          newName={newName}
          newNumber={newNumber}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
          addPerson={addPerson}
      />
      <h2>Numbers</h2>
        <Persons 
          persons={persons}
          search={search}
          handleDelete={handleDelete}
        />
    </div>
  )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'));