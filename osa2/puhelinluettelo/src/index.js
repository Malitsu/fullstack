import ReactDOM from 'react-dom';
import React, { useState } from 'react'

const Person = ({person}) => {
    return (
        <p>{person.name.toString()} {person.number.toString()}</p>
    )
}

const Persons = ({persons, search}) => {

  const personsToShow = (search === '')
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))

  const rows = () => personsToShow.map(person =>
      <Person
          key={person.name}
          person={person}
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

const PersonForm = ({persons, newName, newNumber, setNewName, setNewNumber, setPersons}) => {
    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const addPerson= (event) => {
        event.preventDefault()
        const personObject = {
          name: newName,
          number: newNumber,
          date: new Date().toISOString(),
          important: Math.random() > 0.5
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
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')

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
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          setPersons={setPersons}
      />
      <h2>Numbers</h2>
        <Persons 
          persons={persons}
          search={search} 
        />
    </div>
  )

}

export default App

ReactDOM.render(<App />, document.getElementById('root'));