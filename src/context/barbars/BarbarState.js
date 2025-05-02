import React, {useState} from 'react'
import BarbarContext from './barbarContext'

export const BarbarState = (props) => {
    const host = "https://salon-backend-sigma.vercel.app" || "http://localhost:3001";
    const initialBarbars = [];
    const [barbar, setBarbar] = useState(initialBarbars);

    // get all barbar
    const getallbarbar = async () => {
        const response = await fetch(`${host}/api/barbars/fetchallbarbars`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const json = await response.json();
        // console.log(json)
        setBarbar(json);
    };

    // Add a barbar
    const addbarbar = async (name) => {
        const response = await fetch(`${host}/api/barbars/addbarbars`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        const newBarbar = await response.json();
        setBarbar([...barbar, newBarbar]);
    };

    // Delete barbar
    const deletebarbar = async (id) => {
        const response = await fetch(`${host}/api/barbars/deletebarbars/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        await response.json();

        const newbarbar = barbar.filter((newBarbar) => {
            return newBarbar._id !== id;
        });
        setBarbar(newbarbar);
    }

    // Edit a barbar
    const editbarbar = async (id, name) => {
        const response = await fetch(`${host}/api/barbars/updatebarbars/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });
        await response.json();
        let newbarbar = JSON.parse(JSON.stringify(barbar));
        for (let index = 0; index < newbarbar.length; index++) {
            const element = newbarbar[index];
            if (element._id === id) {
                newbarbar[index].name = name;
                break;
            }
        }
        setBarbar(newbarbar);
    }
    
  return (
    <div>
        <BarbarContext.Provider value={{ barbar, getallbarbar, addbarbar, deletebarbar, editbarbar }}>
            {props.children}
        </BarbarContext.Provider>
    </div>
  )
}
