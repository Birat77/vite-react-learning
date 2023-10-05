import React, { FormEvent, useRef, useState } from 'react'
import { FieldValues, useForm} from 'react-hook-form'
import { string, z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'

const schema  = z.object({
    name: z.string().min(2, {message: 'Name must be more than 2 chars'}),
    age: z.number({invalid_type_error: 'Age field is required'}).min(18,'The age must be minimum of 18')
})

type FormData = z.infer<typeof schema>

const Form = () => {
    const { register, handleSubmit, formState: {errors} } = useForm<FormData>({resolver: zodResolver(schema)})

    const [person, setPerson] = useState({
        name: '',
        age: ''
    })

    const onSubmit = (data:FieldValues) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
            <label htmlFor="name" className="form label">Name</label>
            <input
                {...register('name')}
                id='name' type="text" className="form-control" />
            {errors.name && <p className='text-danger'>{errors.name.message}</p>}  
        </div>
        <div className="mb-3">
            <label htmlFor="" className="form-label">Age</label>
            <input
                {...register('age', {valueAsNumber: true})}
                type="number"
                className="form-control" />
            {errors.age && <p className='text-danger'>{errors.age.message}</p>}  
        </div>
        <button className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Form