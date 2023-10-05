import { useForm} from 'react-hook-form'
import { z } from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { CATEGORIES } from '../../categories'

interface Props {
    onSubmit: (data: ExpenseFormData) => void
}

const schema  = z.object({
    description: z.string().min(2, {message: 'Description must be at least 2 characters'}).max(50),
    amount: z.number({invalid_type_error: 'Amount is required'}).min(1,'The amount must be 1 or more').max(500),
    category: z.enum(CATEGORIES, {errorMap: () => ({message: 'Category is required'})})
})

type ExpenseFormData = z.infer<typeof schema>

const AddExpenseForm = ({onSubmit}: Props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<ExpenseFormData>({resolver: zodResolver(schema)})

  return (
    <form onSubmit={handleSubmit((data) => {
        onSubmit(data)
        reset()
        })} className='mb-3'>
        <div className="mb-3">
            <label htmlFor="description" className="form label">Description</label>
            <input
                {...register('description')}
                id='description' type="text" className="form-control" />
            {errors.description && <p className='text-danger'>{errors.description.message}</p>}  
        </div>
        <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
                {...register('amount', {valueAsNumber: true})}
                type="number"
                className="form-control" />
            {errors.amount && <p className='text-danger'>{errors.amount.message}</p>}  
        </div>
        <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select 
                {...register('category')}
              id="category"
              className="form-select"
              defaultValue={'All'} >
            <option value={''} key={'all'}>All Categories</option>
                {
                    CATEGORIES.map(category=> <option value={category} key={category}>{category}</option>)
                }
            </select>
            {errors.category && <p className='text-danger'>{errors.category.message}</p>}  
        </div>
        <button className="btn btn-primary">Submit</button>
    </form>
  )
}

export default AddExpenseForm;