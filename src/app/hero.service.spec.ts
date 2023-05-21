import { TestBed } from "@angular/core/testing";
import { HeroService } from "./hero.service";
import { MessageService } from "./message.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"

describe("HeroService", () => {

    let mockMessageService;
    let httpTestingController: HttpTestingController;
    let service: HeroService;

    mockMessageService = jasmine.createSpyObj(["add"])

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HeroService,
                { provide: MessageService, useValue: mockMessageService }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        service = TestBed.inject(HeroService);
    });

    describe('getHero', () => {
        it("should call correct url only once", () => {
            service.getHero(4).subscribe(hero => expect(hero.id).toBe(4));

            const req = httpTestingController.expectOne("api/heroes/4");

            req.flush({ id: 4, name: "SuperDude", stregnth: 4 });

            expect(req.request.method).toEqual("GET");
            httpTestingController.verify();
        });

    });


});