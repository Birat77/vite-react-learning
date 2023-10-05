import { useState } from "react";
import AddExpenseForm from "./expense-tracker/components/Form";
import ExpenseList from "./expense-tracker/components/List";
import ExpenseFilter from "./expense-tracker/components/Filters";

//APP- ExpenseTrackers
function App() { 
  useState()
  const [expenses, setExpenses] = useState([
    {id: 1,description: 'desc',amount: 20, category: 'Groceries'},
    {id: 2,description: 'desc',amount: 30, category: 'Entertainment'},
    {id: 3,description: 'desc',amount: 40, category: 'Other'},
    {id: 4,description: 'desc',amount: 50, category: 'Other'},
    {id: 5,description: 'desc',amount: 20, category: 'Groceries'},
  ])

  const [selectedCategory, setSelectedCategory] = useState('');

  const viewableExpenses = selectedCategory ?
    expenses.filter((expense) => expense.category === selectedCategory):
    expenses

  const handleCategoryChange = (category: string) => {
    console.log('selected category', category, viewableExpenses)
    setSelectedCategory(category)
  }

  return <div>
      <AddExpenseForm onSubmit={(expense)=> setExpenses([...expenses, {...expense, id: expenses.length + 1}])}/>
      <ExpenseFilter onSelectCategory={handleCategoryChange}/>  
      <ExpenseList
        expenses={viewableExpenses}
        onDelete={(id)=>{ setExpenses(expenses.filter(expense=>expense.id!==id))}}
      />
      </div>
}

export default App;