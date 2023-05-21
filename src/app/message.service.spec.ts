
import { MessageService } from "./message.service";

describe("Message Service",() => {

    it("should display no message at the start", () => {

        let messageService = new MessageService();

        expect(messageService.messages.length).toBe(0);
    });

    it("should display one message at add", () => {

        let messageService = new MessageService();

        messageService.add("hello");

        expect(messageService.messages.length).toBe(1);
    });

    it("should display zero message when clear", () => {

        let messageService = new MessageService();

        messageService.add("hello");

        messageService.clear();

        expect(messageService.messages.length).toBe(0);
    });
    
});