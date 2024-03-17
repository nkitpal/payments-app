import { useEffect, useState } from "react"
import  { Button }  from "./Button"
import { Link } from "react-router-dom";
import axios from "axios";

export const Users = ({balance}) => {
    // Replace with backend call
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
       const fetchUsers= async () =>{
            const {data} = await axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            })
            setUsers(data.users);
       } 
       fetchUsers();
    }, [filter])

    return <div className="ml-4 mr-4">
        <div className="font-bold mt-6 text-lg text-white">
            Users
        </div>
        <div className="my-2">
            <input type="text" onChange={(e) => {setFilter(e.target.value)}} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User user={user} balance ={balance} />)}
        </div>
    </div>
}

function User({user, balance}) {
    return <div className="flex justify-between text-white ">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-500 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Link to={"/transfer"} state={{
                senderBalance: balance,
                firstname : user.firstName,
                lastname: user.lastName,
                username: user.username,
                userId: user._id,
                }}>
                <Button label={"Send Money"}  />
            </Link>
        </div>
    </div>
}