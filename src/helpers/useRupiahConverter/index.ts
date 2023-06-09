const useRupiahConverter = (number: any, noRp = false) => {
  let rupiah = "";
  const angkarev = String(number).split("").reverse().join("");
  if (angkarev[angkarev.length - 1] === "-") {
    const angkarevmin = angkarev.slice(0, angkarev.length - 1);
    for (let i = 0; i < angkarevmin.length; i++)
      if (i % 3 === 0) rupiah += `${angkarevmin.substr(i, 3)}.`;
    if (noRp) {
      return `-${rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")}`;
    } else {
      return `Rp -${rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")}`;
    }
  } else {
    for (let i = 0; i < angkarev.length; i++)
      if (i % 3 === 0) rupiah += `${angkarev.substr(i, 3)}.`;
    if (noRp) {
      return `${rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")}`;
    } else {
      return `Rp ${rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")}`;
    }
  }
};

export default useRupiahConverter;
