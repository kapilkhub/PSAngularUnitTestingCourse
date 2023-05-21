import { of } from "rxjs";
import { Hero } from "../hero";
import { HeroesComponent } from "./heroes.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HeroService } from "../hero.service";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { HeroComponent } from "../hero/hero.component";
import { By } from "@angular/platform-browser";

describe("Heroes Component (deep test)", () => {
    let heroesComponent: HeroesComponent;
    let heroesComponentFixture: ComponentFixture<HeroesComponent>;
    let HEROES: Hero[];
    let mockHeroService;



    beforeEach(() => {
        HEROES = [
            { id: 1, name: "Superman", strength: 4 },
            { id: 2, name: "Supergirl", strength: 3 },
            { id: 3, name: "SpiderMan", strength: 2 }
        ]

        mockHeroService = jasmine.createSpyObj(["getHeroes", "getHeroNo404", "getHero", "searchHeroes", "addHero", "deleteHero"]);

        heroesComponent = new HeroesComponent(mockHeroService);

        heroesComponent.heroes = HEROES;

        TestBed.configureTestingModule({
            declarations: [HeroesComponent, HeroComponent],
            providers: [
                { provide: HeroService, useValue: mockHeroService }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        });

        heroesComponentFixture = TestBed.createComponent(HeroesComponent)

    });


    it("should render a each hero as a HeroComponent", () => {
        mockHeroService.getHeroes.and.returnValue(of(HEROES));

        heroesComponentFixture.detectChanges();

        const heroesComponentDEs = heroesComponentFixture.debugElement.queryAll(By.directive(HeroComponent));


        expect(heroesComponentDEs.length).toBe(3);

    });

    it(`should call hero service delete method 
    when HeroComponent Delete button is called`, () => {

        spyOn(heroesComponentFixture.componentInstance, "delete");

        mockHeroService.getHeroes.and.returnValue(of(HEROES));
        heroesComponentFixture.detectChanges();

        const heroComponentDEs = heroesComponentFixture.debugElement.queryAll(By.directive(HeroComponent));

        heroComponentDEs[0].query(By.css("button")).triggerEventHandler("click", { stopPropagation: () => { } });

        expect(heroesComponentFixture.componentInstance.delete).toHaveBeenCalledWith(HEROES[0]);

        // mockHeroService.deleteHero.and.returnValue(of(true));
   
        // expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[0]);
        //expect(mockHeroService.deleteHero).toHaveBeenCalledWith(HEROES[0]);

    })



})