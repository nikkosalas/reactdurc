import React, { useState, useRef } from 'react';
import './crud.css'
function CRUD (){

    const list =[
        {
            id: 1,
            name: "HP",
            price: "2222"
        },
        {
            id: 2,
            name: "Dell",
            price: "3333"
        },
    ]
        const [lists, setList] =useState(list)
        const [updateState, setUpdateState] = useState(-1)
    return(
       <div className='crud'>
        <div>
        <AddList setList = {setList }/>
        <form onSubmit={handleSubmit}>
       <table>
        {
            lists.map((current) =>(
                updateState === current.id ? <EditList current ={current} lists={lists} setList={setList}/> :
                <tr>
                    <td>{current.name}</td>
                    <td>{current.price}</td>
                    <td>
                        <button className='edit' onClick={()=> handleEdit(current.id)}>Edit</button>
                        <button className='delete' type='button' onClick={()=> handleDelete(current.id)}>Delete</button>
                    </td>
                </tr>
            ))
        }
       </table>
       </form>
       </div>
       
       </div>
    )

    function handleEdit(id){
        setUpdateState(id)
    }

    function handleDelete(id){
        const newlist = list.filter((li)=> li.id !== id)
        setList(newlist)
    }
    function handleSubmit (event){
        event.preventDefault()
        const name = event.target.elements.name.value
        const price = event.target.elements.price.value
        const newlist = lists.map((li) => (
            li.id === updateState ? {...li, name:name, price:price} : li
        ))

        setList(newlist)
        setUpdateState(-1)
    }
}
function EditList({current, lists, setList}){
    function handleInputname(event){
        const value = event.target.value;
       const newlist = lists.map((li) => (
            li.id === current.id ? {...li, name:value} : li
        ))

        setList(newlist)
    }
    function handleInputprice(event){
        const value = event.target.value;
       const newlist = lists.map((li) => (
            li.id === current.id ? {...li, price:value} : li
        ))

        setList(newlist)
    }
    return(
        <tr>
            <td><input type='text' onChange={handleInputname} name='name' value={current.name}/></td>
            <td><input type='text' onChange={handleInputprice} name='price' value={current.price}/></td>
            <td><button type='submit'>Update</button></td>
        </tr>
    )
}
function AddList({setList}){
    const nameRef = useRef()
    const priceRef = useRef()
    function handleSubmit(event){
        event.preventDefault();
        const name = event.target.elements.name.value;
        const price = event.target.elements.price.value
        const newlist = {
            id: 3,
            name,
            price
        }
        setList((prevList)=> {
            return prevList.concat(newlist)
        })
        nameRef.current.value = ""
        priceRef.current.value = ""
    }
    return(
        <form className='addForm' onSubmit={handleSubmit}>
            <input type='text' name='name' placeholder='Enter Name'  ref={nameRef}/>
            <input type='text' name='price' placeholder='Enter Price' ref={priceRef}/>
            <button type='submit'>Add</button>
        </form>
    )
}

export default CRUD;