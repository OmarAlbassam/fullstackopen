import { useState, useEffect } from 'react'
import service from './Service'

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

const Numbers = ({filteredPersons, remove}) => {
  return(
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((person) =>
          <li key={person.id}>{person.name} {person.number}<button onClick={() => remove(person)}>delete</button></li>
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
    service.getAll().then(data => setPersons(data))
  }),
  [])


const addPerson = (event) => {
  event.preventDefault()
  if (!persons.some(person => person.name === newName) || !persons.some(person => person.number === newNumber)) {
    const nextId = persons.length > 0 ? Math.max(...persons.map(p => Number(p.id))) + 1 : 1
    const newPerson = {id: nextId, name: newName, number: newNumber}
    service.create(newPerson).then(newEntry => {
      setPersons(persons.concat(newEntry))
      setNewName('')
      setNewNumber('')
    })
      
    }
  else {
    alert(`${newName} or ${newNumber} is already added to phonebook`)
  }
} 

const remove = (person) => {
  if(window.confirm(`are you sure you want to delete ${person.name}`)) {
    service.deleteNum(person.id).then(() => {
      setPersons(persons.filter(p => p.id !== person.id))
    })
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
      <Numbers filteredPersons={filteredPersons} remove={remove} />
    </div>
  )
}

export default App