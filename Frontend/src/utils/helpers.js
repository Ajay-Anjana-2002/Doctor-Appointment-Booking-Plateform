export const Currency = "$";

export const calculateAge = (dob) => {
    if (!dob) return 0;

    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
};

const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec",
];

export const slotDateFormat = (slotDate) => {
    if (!slotDate) return "";

    const str = slotDate.toString();

    const parts = str.split("_");

    if (parts.length !== 3) return str;

    const day = parts[0];
    const monthIndex = Number(parts[1]) - 1;
    const year = parts[2];

    if (monthIndex < 0 || monthIndex > 11) return str;

    return `${day} ${months[monthIndex]} ${year}`;
};

export const formatTime = (time) => {
    if (!time) return "";

    return time.toLowerCase();
};

export const getAppointmentStatus = (appointment) => {
    if (appointment.cancelled) return "Cancelled";
    if (appointment.isCompleted) return "Completed";
    return "Upcoming";
};
