import { CATEGORIES } from "../../categories"

interface Props{
    onSelectCategory: (category: string) => void
}

const ExpenseFilter = ({onSelectCategory}:Props) => {
  return (
    <div>
        <select className="form-select" onChange={(event)=>onSelectCategory(event.target.value)}>
            <option value="" key='all'>All Categories</option>
            {
                CATEGORIES.map(category=> <option value={category} key={category}>{category}</option>)
            }
        </select>
    </div>
  )
}

export default ExpenseFilter