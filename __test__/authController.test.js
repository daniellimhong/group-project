require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const {login} = require('../server/Controller/AuthController')
const mongoose = require("mongoose")

jest.setTimeout(600000);

function connectDb(){
    return mongoose.connect(CONNECTION_STRING, {useNewUrlParser: true, useCreateIndex: true});
}

describe("integration tests", () =>{
    let db;

    beforeAll(async () => {
        await connectDb()
      });

    afterAll(() => {
        connection.close();
        db.close();
    });
    
    it("should login user", async done => {
        const req = {
            body: {username: "tbr0wn91", password: "0629"},
            session: {user: {}}
        };
        const res = {
            send: await function(data) {
                expect(data.username).toEqual('tbr0wn91');
                done();
            },
            status: await function(num){
                expect(num).toBe(200);
                return this;
            }

        }
        login(req,res)
    })
})