export const stringAvatar = (name) => {
  const initials = name
    ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
    : "";
  return {
    sx: {
      backgroundColor: "#D9D9D9",
      color: "#222",
      fontWeight: "bold",
    },
    children: initials,
  };
};

export const capitalizeFirstLetter = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

export function calculateAge(dateOfBirth) {
  const dob = new Date(dateOfBirth);
  const now = new Date();

  let age = now.getFullYear() - dob.getFullYear();

  if (now < new Date(now.getFullYear(), dob.getMonth(), dob.getDate())) {
    age--;
  }

  return age;
}
