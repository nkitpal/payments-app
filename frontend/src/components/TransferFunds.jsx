import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Balance } from '../basic/Balance';
import axios from 'axios';
import { BottomWarning } from '../basic/BottomWarning';

export const TransferFunds = () => {

    const {state} = useLocation();
    const {firstname, lastname, username, userId, senderBalance} = state;
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(senderBalance);

    return <div class="flex justify-center h-screen bg-gray-900">
        <div className="h-full flex flex-col justify-center">
            <div
                class="border h-min text-card-foreground max-w-md p-4 space-y-3 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col  p-4">
                    <h2 class="text-3xl font-bold text-center">Transfer Funds</h2>
                </div>
                <div class="px-4">
                <div class="flex justify-center text-green-400 items-center space-x-4 my-4">
                        <h3 class="text-xl font-semibold">Rem. Balance  {": " + balance.toFixed(3)}</h3>
                </div>
                <div class="flex justify-center items-center space-x-4 my-4">
                        <div class="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">
                        <span class="text-xl text-white">{firstname.charAt(0)}</span>
                        </div>
                        <h3 class="text-xl font-semibold">{ firstname + " "+ lastname }</h3>
                </div>
                <div class="flex justify-center items-center space-x-4 my-4">
                        <h3 class="text-xl font-semibold">UID {": " + username }</h3>
                </div>
                
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Paying Amount (in ₹)
                    </label>
                    <input
                        onChange={(e) => setAmount(e.target.value)}
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        value={amount}
                        placeholder="Enter amount"
                    />
                    </div>
                    <button onClick={async () => {
                        console.log(amount, userId);
                        const response = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                            amount: amount,
                            receiverId: userId
                        },{
                            headers:{
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        setAmount(0);
                        setBalance(response.data.balance);
                    }} class="justify-center hover:bg-green-700 rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
                        Initiate Transfer
                    </button>
                    <BottomWarning label={"Return to "} buttonText={"Wallet"} to={'/account'}/>
                </div>
                </div>
        </div>
      </div>
    </div>
}
export default TransferFunds