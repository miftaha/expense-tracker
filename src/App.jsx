import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [inputStatement, setInputStatement] = useState({
    name: '',
    amount: '',
    statementType: 'Income',
  })
  const [statement, setStatement] = useState([])
  const [showError, setShowError] = useState({ name: false, amount: false })
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = statement.reduce((sum, { amount, statementType }) => {
      if (statementType === 'Income') {
        return sum + parseFloat(amount)
      } else {
        return sum - parseFloat(amount)
      }
    }, 0)
    setTotal(newTotal)
  }, [statement])

  console.log(total)

  const renderTotal = () => {
    if (total > 0) {
      return <h1 className="text-[50px] text-green-500">+{Math.abs(total)}</h1>
    } else if (total < 0) {
      return <h1 className="text-[50px] text-red-500">-{Math.abs(total)}</h1>
    } else {
      return <h1 className="text-[50px]">{Math.abs(total)}</h1>
    }
  }

  const handleInputStatement = (e) => {
    setInputStatement({
      ...inputStatement,
      [e.target.name]: e.target.value,
    })
  }

  const handleClick = () => {
    const { name, amount, statementType } = inputStatement
    if (!name) {
      return setShowError({ name: true, amount: false })
    } else if (!amount) {
      return setShowError({ name: false, amount: true })
    } else {
      setShowError({ name: false, amount: false })
    }
    setStatement([
      ...statement,
      {
        name: name,
        amount: parseFloat(amount).toFixed(2),
        date: new Date().toLocaleDateString(),
        statementType: statementType,
        id: uuidv4(),
      },
    ])
    setInputStatement({ name: '', amount: '', statementType: 'Income' })
  }

  console.log(statement)
  return (
    <main className="max-w-lg mx-auto m-6">
      <div>
        {renderTotal()}
        <div className="flex  justify-between items-center mb-8">
          <input
            type="text"
            name="name"
            value={inputStatement.name}
            onChange={handleInputStatement}
            placeholder="Income or Expense"
            className={
              showError.name
                ? 'border-solid outline-none border-2 border-b-red-500 mr-2'
                : 'border-solid outline-none border-2 border-b-gray-500 mr-2'
            }
          />
          <input
            type="number"
            placeholder="Amount"
            name="amount"
            onChange={handleInputStatement}
            value={inputStatement.amount}
            className={
              showError.amount
                ? 'border-solid outline-none border-2 border-b-red-500 mr-2'
                : 'border-solid outline-none border-2 border-b-gray-500 mr-2'
            }
          />
          <select
            className="mr-2"
            onChange={handleInputStatement}
            value={inputStatement.statementType}
            name="statementType"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button className="w-32 ml-2" onClick={handleClick}>
            +
          </button>
        </div>
        <div>
          {statement.map(({ name, amount, date, id, statementType }) => (
            <div
              className="flex justify-between mb-2 p-2 shadow-md shadow-gray-300 "
              key={id}
            >
              <div>
                <h4 className="font-bold text-lg">{name}</h4>

                <p>{date}</p>
              </div>
              <p
                className={`${
                  statementType === 'Income' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {statementType === 'Income' ? '+' : '-'}${amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

export default App
