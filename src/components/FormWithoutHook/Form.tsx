import React, { FormEvent, useRef, useState } from 'react'

const Form = () => {

    const [person, setPerson] = useState({
        name: '',
        age: ''
    })

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        console.log(person)
    }
  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form label">Name</label>
            <input
                value={person.name}
                onChange={(event)=> setPerson({...person, name: event.target.value})}
                id='name' type="text" className="form-control" />    
        </div>
        <div className="mb-3">
            <label htmlFor="" className="form-label">Age</label>
            <input
                value={person.age}
                onChange={(event)=> setPerson({...person, age: event.target.value})}
                type="number"
                className="form-control" />
        </div>
        <button className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Form