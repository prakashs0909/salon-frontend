import React from 'react';

const Checklist = ({ appointment, toggleChecklistItemStatus }) => {
    // console.log('Appointment:', appointment); // Add this line

    if (!appointment.checklist || !Array.isArray(appointment.checklist) || appointment.checklist.length === 0) {
        return <p className="text-gray-700 mt-2">No checklist items</p>;
    }

    const capitalize = (word) => {
        if (word === "danger") {
            word = "error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    };

    return (
        <div className="mt-2">
            <p className="font-semibold">Checklist:</p>
            <ul className="list-none">
                {appointment.checklist.map((item, index) => (
                    <li key={index} className="flex items-center py-2">
                        <input
                            type="checkbox"
                            checked={item.done}
                            onChange={() => toggleChecklistItemStatus(appointment._id, index)}
                            className="mr-2"
                        />
                        <span className={item.done ? "line-through text-gray-500" : "text-gray-700"}>
                            {capitalize(item.text.name)}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Checklist;
