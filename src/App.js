import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import AddItem from './AddItem';
import { useState, useEffect } from 'react';
import './index.css'
import SearchItem from './SearchItem';
import apiRequest from './apiRequest';
//! we can render strings ints and array as text 
//! however we cannot do the same with objects and booleans

//!props is an example of prop drilling because you are sending a var from a parent component to a 
//! child component
function App() {
  const API_URL = "http://localhost:3500/items";
  // const [items, setItems] = useState(JSON.parse(localStorage.getItem("shoppingList")) || []); //if empty it becomes an empty array
  const [items, setItems] = useState([]); //if empty it becomes an empty array
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //! if it has no dependencies effect change will cause a rerender
  //! [] will cause it to only happen during load time
  //! use effect is asynchronous 
  useEffect(() => {
    // localStorage.setItem("shoppingList",JSON.stringify(items));
    const fetchItems = async() => {//! read crud operation
      try{
        const response = await fetch(API_URL);
        //! response.ok would return a 200 status so if its not
        //! not okay we will throw an error
        if(!response.ok) throw Error("Did not receive expected data");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      }
      catch(error){//! errors that are not normally caught
        setFetchError(error.message);
      }
      finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => {//! simulating real api and how it takes some time before it fetches items
      (async () => await fetchItems())();
    }, 2000);
  }, [])

  const addItem = async(item) => {
    const id = items.length ? String(parseInt(items[items.length - 1].id) + 1) : "1";
    const myNewItem = {id, checked: false, item};
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(myNewItem)
    }

    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleDeleteItem = async(id) => { 
    const listItems = items.filter((item) => item.id !== id);//!filter out item.id that equals id 
    console.log(listItems)
    setItems(listItems);
    
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type" : "application/json"
      },
      //! delete does not need a json body
    }

    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }

  const handleCheck = async(id) => {
    console.log(id);
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
    setItems(listItems);
    
    const myItem = listItems.filter((item) => item.id === id);
    console.log(typeof(myItem[0]));
    console.log(myItem.length);
    const updateOptions = {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({checked: myItem[0].checked})
    }

    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); //! will not automatically refresh the screen when submitting 
    
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');//clears the field
    console.log("submit")
  }


  return (//this returns jsx jsx means javascipt and xml
    <div className="App">
      <Header  title = "Groceries" />
      <SearchItem search = {search} setSearch = {setSearch}/>
      <AddItem newItem = {newItem} setNewItem = {setNewItem} handleSubmit = {handleSubmit}/>
      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p style = {{color: "red"}}> {`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))} 
          setItems = {setItems} handleCheck = {handleCheck} handleDeleteItem = {handleDeleteItem}
        />}
      </main>
      <Footer length = {items.length}/> 
    </div>
  );
}

export default App;
