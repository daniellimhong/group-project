require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const { getListing } = require("../server/Controller/ListingsController");
const mongoose = require("mongoose");

jest.setTimeout(60000);

function connectDb() {
    return mongoose.connect(CONNECTION_STRING, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
  }

  describe("listings integration tests", () => {
      let db;

      beforeAll(async () => {
          await connectDb();
      });

      afterAll(() => {
          connection.close();
          db.close();
      })
      
      it("should get the listing", async done => {
          const req = {
              params: { id: "5d6ff6f36f2ad20672e22983" }
          }

          const res = {
              send: await function(data){
                console.log(data._id, req.params.id)
                  expect(data._id.toString()).toEqual(req.params.id)
                //   console.log(data);
                  done()
              },
              status: await function(num){
                  expect(num).toBe(200);
                  return this;
              }
          }
         return getListing(req, res);
      })
  })