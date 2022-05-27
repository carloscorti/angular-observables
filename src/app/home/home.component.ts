import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  filter,
  map,
  Observable,
  Subscriber,
  Subscription,
  TeardownLogic,
} from "rxjs";
import { StateService } from "../service/state.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscribeReference!: Subscription;
  private subscribeStateReference!: Subscription;
  isActiveState = false;

  constructor(private stateService: StateService) {}

  ngOnInit() {
    const customIntervalObservable = new Observable<string>(
      (observer: Subscriber<string>): TeardownLogic => {
        let count = 0;
        const interval = 1000;
        const intevalId = setInterval(() => {
          observer.next(`${count / interval}`);
          if (count === 4000) observer.complete();
          // error can return a diferent T than Observable<T>
          if (count === 6000) observer.error(count / interval);
          count += interval;
        }, interval);

        // gets triggered when the obserbable finish
        // via error or complete
        return () => {
          clearInterval(intevalId);
          console.log("Interval cleaned Cleaned");
        };
      }
    );

    this.subscribeReference = customIntervalObservable
      .pipe(
        // you can parse the returned value from Observable<T> to Observable<B> with pipes
        // in this case we define new Observable<string>, but as map parses it into number
        // it parse into Observable<number>
        // is kind of creatind a new observable in to of the original one
        map((count) => Number(count)),
        filter((count) => count % 2 === 0)
      )
      .subscribe({
        next: (count) => console.log(count),
        error: (error) => console.log("error", error),
        complete: () => console.log("count complete"),
      });

    this.isActiveState = this.stateService.getState();
    this.subscribeStateReference = this.stateService
      .stateSubscriptionChannel()
      .subscribe((state) => {
        this.isActiveState = state;
      });
  }

  ngOnDestroy(): void {
    this.subscribeReference.unsubscribe();
    this.subscribeStateReference.unsubscribe();
  }

  onHomeButtonClick() {
    this.stateService.stateForecastChannel(!this.isActiveState);
  }
}
