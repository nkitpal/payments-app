export const Balance = ({ balance}) => {
    return <div className="flex mt-5">
        <div className="font-bold text-white text-lg ml-4">
            Your balance
        </div>
        <div className="font-semibold text-white ml-4 text-lg">
            Rs {balance.toFixed(3)}
        </div>
    </div>
}