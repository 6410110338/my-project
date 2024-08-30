//import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [name, setName] = useState("eevee");
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);

  async function getPokemon() {
    try {
      let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      if (!res.ok) throw new Error('Network response was not ok');
      let pokemonData = await res.json();
      setData(pokemonData);
      setErr(false); 
    } catch (err) {
      setData([]);
      setErr(true);
    }
  }

  useEffect(() => {
    getPokemon();
    console.log(data);
  }, []);

  console.log(name);

  function handleSubmit(e) {
    e.preventDefault(); 
    getPokemon();
  }


  return (
    <div className="flex item-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 min-h-screen">
      <div className="bg-white text-center rounded-3xl border shadow-inner p-10 max-w-xs min-h-48 my-auto ">
        <form onSubmit={handleSubmit}>
          <input onChange={(e) => setName(e.target.value)} value={name} type="text" className='p-3 border-solid border-2 border-indigo-600 rounded-md text-center' placeholder='Search by name' />
          <button
            className='bg-indigo-600 px-2 mt-5 text-lg rounded text-gray-100'
            type="submit" 
          >
            Search
          </button>
        </form>

        {err ? (
          <p className='my-5.5'>No data was found!</p>
        ) : (
          <>
            <img className='my-5 w-50 h-50 rounded-xl shadow-lg mx-auto' alt={`${data.name}`} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`} />
            <h1 className="text-lg text-gray-700">{data.name}</h1>
            <h3 className='text-lg text-gray-500 mt-1.5'>Weight: {data.weight}</h3>
          </>
        )}


      </div>
    </div>
  );
}

export default App;
