# Delameta's NodeJS Module

Before using delameta's nodejs module please download/clone this [Boilerplate](https://git.delameta.id/gustialfian/nodejs-modular-monolith)

- [auth](#auth) (User Authentication)
- [migration](#migration) (Create table User and new user Admin)
- [perfmon](#perfmon) (Performance Monitoring)

## Usage

~EXAMPLE~

- Select the folder Delameta's NodeJS Module you will use

![alt text](https://i.ibb.co/kmfFfFR/Screen-Shot-2019-11-27-at-10-30-26.png)

- Click download and select Download this directory `zip`

![alt text](https://i.ibb.co/6H9CZT7/Screen-Shot-2019-11-27-at-10-33-54.png)

- Move folder `auth` to `src/core`

### auth

- Install [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- Copy code below to to `src/router.js`

```javascript
app.use("/api/user", require("./core/auth/controller"));
```

- Add variable USERNAME and PASSWORD in `.env`

- To run this module, please download the [migration](https://git.delameta.id/orizkis/delameta-nodejs-module/tree/master/migration) module

### migration

- In file `package.json` copy this code to object has property "scripts"

```javascript
"migration": "node src/core/migration"
```

- In your terminal, type below :

```bash
npm run migration
```

### perfmon

- Install [diskusage](https://www.npmjs.com/package/diskusage)
- Copy code below to `src/router.js`

```javascript
app.use("/api/perfmon", require("./core/perfmon/controller"));
```

## Contributing

- [Rizki Setyawan](https://git.delameta.id/orizkis)
