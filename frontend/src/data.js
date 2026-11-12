// fetch("http://localhost:3000/todos")
//   .then((r) => r.json())
//   .then((data) => console.log("GOT:", data))
//   .catch((err) => console.error("FAILED:", err));

async function fetchData() {
  const data = await fetch("http://localhost:3000/todos");
  const result = await data.json();
  return result;
}

fetchData()
  .then((data) => console.log("GOT:", data))
  .catch((err) => console.error("FAILED:", err));
