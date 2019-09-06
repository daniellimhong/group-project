require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const { register } = require("../server/Controller/AuthController");
const mongoose = require("mongoose");

// This test will add a new user to the live database, it will need to be deleted after every run

jest.setTimeout(60000);

function connectDb() {
  return mongoose.connect(CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
}

describe("registration tests", () => {
  let db;

  beforeAll(async () => {
    await connectDb();
  });

  afterAll(() => {
    connection.close();
    db.close();
  });

  it("should register a new user", async done => {
    const req = {
      body: { username: "regTest", password: "pass", email: "unique@com" },
      session: { user: {} }
    };
    const res = {
      send: await function(data) {
        expect(data.username).toEqual("regTest");
        expect(data.email).toEqual("unique@com");
        done();
      },
      status: await function(num) {
        expect(num).toBe(200);
        return this;
      }
    };
    register(req, res);
  });

  it("shouldn't register a new user", async done => {
    const req = {
      body: { username: "regTest", password: "pass", email: "unique@com" },
      session: { user: {} }
    };
    const res = {
      send: await function(data) {
        console.log("this test ran", data);
        expect(data).toEqual({
          message: "That username or Email is already registered"
        });
        done();
      },
      status: await function(num) {
        expect(num).toBe(401);
        return this;
      }
    };
    register(req, res);
  });
});
