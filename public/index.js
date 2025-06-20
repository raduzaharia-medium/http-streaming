document.getElementById("increment").addEventListener("click", async () => {
  fetch("/api/increment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: 1 }),
  });
});

document.getElementById("decrement").addEventListener("click", async () => {
  fetch("/api/decrement", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ value: 1 }),
  });
});

const response = await fetch("/api/stream");
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();

  if (done) break;

  const chunk = decoder.decode(value);
  const listItem = document.createElement("li");

  listItem.textContent = chunk;
  document.getElementById("list").appendChild(listItem);
}
