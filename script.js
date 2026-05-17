const params =
new URLSearchParams(location.search);

const id =
params.get("id");

console.log(id);

console.log(pages);

console.log(pages[id]);
