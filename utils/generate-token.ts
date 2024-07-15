// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AES, lib } from 'rn-crypto-js'
import base64 from 'react-native-base64'

export type AuthInfo = {
  companyId: string
  system: string
  codigoLiberacao: string
}

type UserInfo = {
  id: string
  password: string
}

const AUTH_CONSTS = {
  SALT: 'Y54T1SCtmbrSxJlzwAB22mwU7fMpO4beaGg1zcGVHz528XfGFYwtMFb5yCcfDQKGH3LjoRuQ3RY97V5ZGuIMu34v5fvNEvNOoeft',
}

const SECRET_KEY =
  'Q::ulZ}JvyL:_S&hURxJjOjs/1<c5Yz5xt<0b43R/BnU!Hw5;6FSI66ar9G1,0J5}#FoqfoX#N<e}q45'

function encrypt(data: lib.WordArray | string): string {
  const dataEncrypt = AES.encrypt(data, SECRET_KEY)

  return dataEncrypt.toString()
}

/** function decrypt(data: lib.CipherParams | string): string {
  const dataDecrypt = AES.decrypt(data, SECRET_KEY)

  return dataDecrypt.toString(enc.Utf8)
} */

export function generateToken(
  { id, password }: UserInfo,
  { companyId, codigoLiberacao }: AuthInfo,
): string {
  const passwordCrypt = encrypt(password)

  // console.log(
  //   JSON.stringify({ companyId, codigoLiberacao, id, password }, null, 2),
  // )

  const token = base64.encode(
    `${companyId}${AUTH_CONSTS.SALT}${String(codigoLiberacao).trim()}${
      AUTH_CONSTS.SALT
    }${id}${AUTH_CONSTS.SALT}${passwordCrypt}`,
  )

  return token
}
