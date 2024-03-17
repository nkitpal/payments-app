
const data = fetch("https://sum-server.100xdevs.com/todos").then((res) => {
     return res.json().then((json) => {return json});
})

setTimeout(() => {
    const {obj} = data;
    console.log(data);
},5000);
