import { useReducer, useState } from "react";
import "./App.css";

interface Product {
  name: string;
  price: number | null;
}

type Action = {
  type: "create" | "update";
  payload: Product;
  id?: number;
};

const MockProductItem = {
  name: "mock",
  price: 100,
};

const InitProductItem = {
  name: "",
  price: null,
};

const reducer = (state: Product[], action: Action) => {
  switch (action.type) {
    case "create":
      return [...state, action.payload];
    case "update":
      return state.map((p, i) => (i === action.id ? action.payload : p));
    default:
      throw new Error(`Invalid action type ${action.type}`);
  }
};

function App() {
  const [product, setProduct] = useState<Product>(InitProductItem);
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <>
      <ul>
        {state.map((product, idx) => (
          <li key={idx}>
            {product.name}: {product.price}
            <button
              onClick={() =>
                dispatch({ type: "update", payload: MockProductItem, id: idx })
              }
            >
              update
            </button>
          </li>
        ))}
      </ul>
      <input
        name="productName"
        value={product?.name || ""}
        onChange={(e) => {
          if (e.target.value) {
            setProduct((prevState) => {
              if (prevState) {
                return {
                  ...prevState,
                  name: e.target.value,
                };
              }
              return {
                name: e.target.value,
                price: 0,
              };
            });
          }
        }}
      />
      <button onClick={() => dispatch({ type: "create", payload: product })}>
        create
      </button>
    </>
  );
}

export default App;
