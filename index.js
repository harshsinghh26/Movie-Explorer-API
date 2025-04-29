// // console.log(Math);
// // console.log(Math.abs(-4));
// // console.log(Math.round(4.6));
// // console.log(Math.ceil(4.2));
// // console.log(Math.floor(4.9));
// // console.log(Math.min(4, 3, 6, 8));
// // console.log(Math.max(4, 3, 6, 8));

// let myDate = new Date();
// // console.log(myDate.toString());
// // console.log(myDate);
// // console.log(myDate.toDateString());
// // console.log(myDate.toLocaleString());
// // console.log(typeof myDate);

// // let myCreatedDate = new Date(2023, 0, 23)
// // let myCreatedDate = new Date(2023, 0, 23, 5, 3)
// // let myCreatedDate = new Date("2023-01-14")
// let myCreatedDate = new Date("01-14-2023");
// // console.log(myCreatedDate.toLocaleString());

// let myTimeStamp = Date.now();

// // console.log(myTimeStamp);
// // console.log(myCreatedDate.getTime());
// // console.log(Math.floor(Date.now()/1000));

// // let newDate = new Date();
// // console.log(newDate);
// // console.log(newDate.getMonth() + 1);
// // console.log(newDate.getDay());

// // `${newDate.getDay()} and the time `

// // const newOne = newDate.toLocaleString("default", {
// //   weekday: "long",
// // });

// // console.log(newOne);

// // Array

// const marvel_heros = ["thor", "Ironman", "spiderman"];
// const dc_heros = ["superman", "flash", "batman"];

// // marvel_heros.push(dc_heros);

// // console.log(marvel_heros);
// // console.log(marvel_heros[3][1]);

// // const allHeros = marvel_heros.concat(dc_heros);
// // console.log(allHeros);

// // const all_new_heros = [...marvel_heros, ...dc_heros];

// // console.log(all_new_heros);

// const another_array = [
//   1,
//   2,
//   3,
//   [4, 5, [8, [7, [9, [9, 8, 65, 6, [7, 7, 8, [8, 9]]]]]]],
//   7,
//   [6, 7, [4, 5]],
// ];

// const real_another_array = another_array.flat(Infinity);
// // console.log(real_another_array);

// // console.log(Array.isArray("Hitesh"));
// // console.log(Array.from("Hitesh"));
// // console.log(Array.from({ name: "hitesh" })); // interesting

// let score1 = 100;
// let score2 = 200;
// let score3 = 300;

// // console.log(Array.of(score1, score2, score3));

// const mySym = Symbol("key1");

// const JsUser = {
//   name: "Hitesh",
//   "full name": "Hitesh Choudhary",
//   [mySym]: "mykey1",
//   age: 18,
//   location: "Jaipur",
//   email: "hitesh@google.com",
//   isLoggedIn: false,
//   lastLoginDays: ["Monday", "Saturday"],
// };

// JsUser.greeting = function () {
//   console.log("Hello JS user");
// };
// JsUser.greetingTwo = function () {
//   console.log(`Hello JS user, ${this.name}`);
// };

// JsUser.greeting();
// JsUser.greetingTwo();
