import { SHA256 } from 'crypto-js';

export const Users = ["이혜빈", "김유나", "김지영", "송소현", "이한솔", "조혜진", "진영화"]
export const dateRegexp = /^2[0-9]{3}[0-1]{1}[0-9]{1}[0-3]{1}[0-9]{1}/g
export const getRandomTarget = (list, name, value, salt) => {
    return list[SHA256(value + name).toString().split('').map(_ => _.charCodeAt()).reduce((a,b) => a+b + 10 + salt,0) % list.length]
}