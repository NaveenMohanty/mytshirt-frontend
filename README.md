# MyTshirt

This is the front of MyTshirt E-commerce website project.
[Link to Working project's website](https://myshirtstore.herokuapp.com/)

### Tech Used

- [ReactJS]
- [node.js]
- [Stripe]

### How to clone and run this project to your system.

```sh
$ git clone https://github.com/NaveenMohanty/mytshirt-frontend.git
$ cd mytshirt-frontend
$ npm install
$ node app.js
```

### This project has .env file for Environment Variable.

```
REACT_APP_BACKEND=<--Backend URL-->/api 
REACT_APP_STRIPEPK="<--Stripe Public Key-->"
```

> This project use stripe as payment gateway so you have to use it's Public key which is present in your [Stripe] dashboard.
> Make a .env file to declare all the above environment variabale.

[ReactJS]: https://reactjs.org/
[node.js]: http://nodejs.org
[Stripe]: https://www.npmjs.com/package/stripe
