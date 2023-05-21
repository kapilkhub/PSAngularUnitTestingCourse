import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { Component, Input, NO_ERRORS_SCHEMA } from "@angular/core";

describe("Heroes Component", () => {
    let heroesComponent: HeroesComponent;
    let heroesComponentFixture: ComponentFixture<HeroesComponent>;
    let HEROES: Hero[];
    let mockHeroService;


    @Component({
        selector: 'app-hero',
        template:'<div></div>'
    })
    class FakeHeroComponent {
        @Input() hero: Hero;
    }
    beforeEach(() => {
        HEROES = [
            { id: 1, name: "Superman", strength: 4 },
            { id: 2, name: "Supergirl", strength: 3 },
            { id: 2, name: "SpiderMan", strength: 2 }
        ]

        mockHeroService = jasmine.createSpyObj(["getHeroes", "getHeroNo404", "getHero", "searchHeroes", "addHero", "deleteHero"]);

        heroesComponent = new HeroesComponent(mockHeroService);

        heroesComponent.heroes = HEROES;

        TestBed.configureTestingModule({
            declarations: [HeroesComponent, FakeHeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ]
        });

        heroesComponentFixture = TestBed.createComponent(HeroesComponent)
    });

    it("should delete a hero when delete", () => {
        mockHeroService.deleteHero.and.returnValue(of(true));
        heroesComponent.delete(HEROES[1]);
        expect(heroesComponent.heroes.length).toBe(2)
    });

    it("should call delete hero", () => {
        mockHeroService.deleteHero.and.returnValue(of(true));
        heroesComponent.delete(HEROES[1]);
        expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[1]);
    });

    it("should set heroes correctly from service", () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        heroesComponentFixture.detectChanges();
        expect(heroesComponentFixture.componentInstance.heroes.length).toEqual(3);
    });

});