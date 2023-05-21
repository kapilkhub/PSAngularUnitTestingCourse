import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroComponent } from "./hero.component";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { By } from "@angular/platform-browser";

describe("HeroComponent (Shallow Test)", () => {

    let fixture: ComponentFixture<HeroComponent>;

    beforeEach(() => {

        TestBed.configureTestingModule({
            declarations: [HeroComponent],
            schemas: [NO_ERRORS_SCHEMA]
        });

        fixture = TestBed.createComponent(HeroComponent)
    });

    it("should have a correct Hero", () => {

        fixture.componentInstance.hero = { id: 1, name: "SuperDude", strength: 3 };
        expect(fixture.componentInstance.hero.name).toEqual("SuperDude");
    });

    it("anchor tag should have the correct name", () => {
        fixture.componentInstance.hero = { id: 1, name: "SuperDude", strength: 3 };
        fixture.detectChanges();

        let deAnchor = fixture.debugElement.query(By.css("a"));
        expect(deAnchor.nativeElement.textContent).toContain('SuperDude');
        // expect(fixture.nativeElement.querySelector('a').textContent).toContain('SuperDude');

    });

});