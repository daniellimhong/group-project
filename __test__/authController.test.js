require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const {
  login,
  userSession,
  editProfile,
  logout
} = require("../server/Controller/AuthController");
const mongoose = require("mongoose");

jest.setTimeout(600000);

function connectDb() {
  return mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
}

describe("auth integration tests", () => {
  let db;

  beforeAll(async () => {
    await connectDb();
  });

  afterAll(() => {
    connection.close();
    db.close();
  });

  it("should login user", async done => {
    const req = {
      body: { username: "tbr0wn91", password: "0629" },
      session: { user: {} }
    };
    const res = {
      send: await function(data) {
        expect(data.username).toEqual("tbr0wn91");
        console.log(data)
        done();
      },
      status: await function(num) {
        expect(num).toBe(200);
        return this;
      }
    };
    login(req, res);
  });

  it("should edit profile", async done => {
    const req = {
      params: { id: "5d6fe901c32113430063c07d" },
      body: { email: "jestTest@email.com" },
      session: {user: { 
        username: 'tbr0wn91',
          email: 'tbrown@gmail.com',
          id: "5d6fe901c32113430063c07d",
          listings: [] 
        }}
    };

    const res = {
      send: await function(data) {
        expect(data.email).toEqual("jestTest@email.com");
        console.log("The new email is " + data.email);
        done();
      },
      status: await function(num) {
        expect(num).toBe(200);
        return this;
      }
    }
    editProfile(req, res)
  });


//   it("should logout", async done => {
//       const req = {
//         session: {user: { 
//             username: 'tbr0wn91',
//               email: 'tbrown@gmail.com',
//               id: "5d6fe901c32113430063c07d",
//               listings: [] 
//             }}
//       }

//       const res = {
//         send: await function(data) {
//           expect(data).toEqual("user logged out, userSession destroyed");
//           console.log(data);
//           console.log(req.session.user)
//           done();
//         },
//         status: await function(num) {
//           expect(num).toBe(200);
//           return this;
//         }
//       }
//       logout(req, res)
//   })

});
