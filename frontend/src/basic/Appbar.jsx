export const Appbar = ({username}) => {
    
    return (
    <div className=" bg-gray-400 shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM Wallet
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                Hello, {username?username.split("@")[0]:"U"}
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {username?username.charAt(0):"U"}
                </div>
            </div>
        </div>
    </div>
)}