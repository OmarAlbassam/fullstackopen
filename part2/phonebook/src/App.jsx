import { useState, useEffect } from 'react'
import axios, { Axios } from 'axios'
const Filter = ({ search, handleSearchChange }) => (
  <div>filter shown with <input value={search} onChange={handleSearchChange}/></div>
)

const Add = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange}) => {
  return(
  <div>
    <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
  </div>
  )
}

const Numbers = ({filteredPersons}) => {
  return(
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person, i) =>
          <li key={i}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )
}





const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect((() => {
    axios.get('http://localhost:3001/persons ').then(response => {
      setPersons(response.data)
    })
  }),
  [])


const addPerson = (event) => {
  event.preventDefault()
  if (!persons.some(person => person.name === newName) || !persons.some(person => person.number === newNumber)) {
    const newPersons = persons.concat({ name: newName, number: newNumber })
      setPersons(newPersons)
      setNewName('')
      setNewNumber('')
    }
  else {
    alert(`${newName} or ${newNumber} is already added to phonebook`)
  }
} 

 const handleNameChange = (event) => {
  setNewName(event.target.value)
 }
const handleNumberChange = (event) => {
  setNewNumber(event.target.value)
 }

 const handleSearchChange = (event) => {
  setSearch(event.target.value)
 }
 
   const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <Add addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Numbers filteredPersons={filteredPersons} />
    </div>
  )
}

export default App