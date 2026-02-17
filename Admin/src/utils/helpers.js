// 💰 Currency used across Admin + Doctor
export const Currency = "$";

// 🎂 Calculate Age from DOB
export const calculateAge = (dob) => {
    if (!dob) return "N/A";

    const birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) return "N/A";

    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age >= 0 ? age : "N/A";
};

// 📅 Slot Date Formatter
const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
];

export const slotDateFormat = (slotDate) => {
    if (!slotDate) return "";
    const dateArray = slotDate.split("_");
    return (
        dateArray[0] +
        " " +
        months[Number(dateArray[1])] +
        " " +
        dateArray[2]
    );
};
