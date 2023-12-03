import fs from "fs"
import * as jose from "jose"
// logger function for debugging
export function logger(...args: any[]) {

    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    fs.appendFile('log.txt', `${dateString} ${args.join(' ')}\n`, (err) => {
        if (err) throw err;
    });


}

export async function createJwt(data: any) {
    const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const alg = 'HS256'

const jwt = await new jose.SignJWT({ path: data})
  .setProtectedHeader({ alg })
  .setIssuedAt()
        .sign(secret)

    return jwt
}

export async function verifyJwt(jwt: string) {
    const secret = new TextEncoder().encode(
  'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
    )
    const alg = 'HS256'

    const result = await jose.jwtVerify(jwt, secret, { algorithms: [alg] })
    return result
}