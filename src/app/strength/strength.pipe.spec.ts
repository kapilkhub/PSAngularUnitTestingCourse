import { StrengthPipe } from "./strength.pipe";

describe('StregnthPipe', () => {
    it("should display weak if strength is 5", () => {
        let stregnthPipe = new StrengthPipe();

        expect(stregnthPipe.transform(5)).toEqual('5 (weak)');
    });

    it("should display strong is the strength is 10", () =>{
        let stregnthPipe = new StrengthPipe();

        expect(stregnthPipe.transform(10)).toEqual('10 (strong)');

    });

});