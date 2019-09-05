require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const {login, logout} = require('../server/Controller/AuthController')
const mongoose = require("mongoose")

jest.setTimeout(60000);

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

describe("logout integration test", () =>{
    let db;

    beforeAll(async () => {
        await connectDb()
      });

    afterAll(() => {
        connection.close();
        db.close();
    });
    
    it("should logout user", async done =>{
        const req = {
            session: {
                destroy: function(){
                    req.session ={}
                }
            }
        }
        const res = {
            send: await function(data){
                // console.log("did I run?", data)
                expect.stringContaining("logged out")
                done();
            },
            status: await function(num){
                console.log("did I run?", num)
                expect(num).toBe(200)
                return this;
            }
        }

        logout(req, res)
        
    })
});