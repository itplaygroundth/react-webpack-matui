
import { compareAsc, format } from "date-fns";

//format(new Date(2014, 1, 11), "yyyy-MM-dd");

import md5 from 'md5';

export const requestTime  = format(new Date(),'yyyyMMddhmmss')
export const createSignature = (MethodName:string,requesttime:string) =>{
   try {
       const secret_key = "456Ayb";
       const operator_code="E293";
       
       const hash = md5(operator_code +requesttime + MethodName.toLowerCase() +secret_key)
       //Crypto.MD5(operator_code +requesttime + MethodName.toLowerCase() +secret_key).toString()//.update(operator_code +requesttime + MethodName.toLowerCase() +secret_key).digest("hex").toString()
       return hash
   } catch (error) {
       console.log(error)
   }
   

}