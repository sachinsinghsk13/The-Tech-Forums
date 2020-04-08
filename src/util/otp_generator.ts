export default class OTPGenerator {
    constructor() {}

    static generateOTP() : string {
        let otp = 0;
        do {
            let random = Math.random();
            otp = Math.round(random * 10000); // Generates a five digit otp
        } while (otp < 1000)
        
        return otp.toString();
    }
}