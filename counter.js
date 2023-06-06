function modifyTimeWithZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
  
    return i;
  }

function Counter() {
const [count, setCount] = React.useState(0);

const increment = () => {
    setCount(count + 1);
};

const decrement = () => {
    setCount(count - 1);
};

return (
    <div>
    <h1>Лічильник: {count}</h1>
    <button onClick={increment}>+1</button>
    <button onClick={decrement}>-1</button>
    </div>
);
}

ReactDOM.render(
<Counter />,
document.getElementById("root")
);
  