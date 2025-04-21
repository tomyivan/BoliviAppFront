const weekdays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
export const Days = () => {
    return (
        <div className="grid grid-cols-7 text-center font-semibold mb-2">
                {weekdays.map((day) => (
                    <div key={day}>{day}</div>
                ))}
            </div>
    )
}