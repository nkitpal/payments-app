const z = require("zod");

const signupBody = z.object({
    username : z.string().email().min(5),
    firstname :  z.string().min(3),
    lastname: z.string().min(1),
    password: z.string().min(8),
})

const signinBody = z.object({
    username : z.string().email().min(5),
    password: z.string().min(8),
})
const updateBody = z.object({
    firstname : z.string().min(3),
    lastname : z.string().min(1),
    password: z.string().min(8),
})
module.exports = {
    signupBody,
    signinBody,
    updateBody
}