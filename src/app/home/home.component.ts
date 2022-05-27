import { Component, OnInit, OnDestroy } from "@angular/core";
import { interval, observable, Observable, Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private subscribeReference!: Subscription;

  constructor() {}

  ngOnInit() {
    const customIntervalObservable = new Observable<string>((observer) => {
      let count = 0;
      const interval = 1000;
      setInterval(() => {
        observer.next(`${count / interval}`);
        if (count === 4000) observer.complete();
        // error can return a diferent T than Observable<T>
        if (count === 6000) observer.error(count / interval);
        count += interval;
      }, interval);
    });

    this.subscribeReference = customIntervalObservable.subscribe({
      next: (count) => console.log(count),
      error: (error) => console.log("error", error),
      complete: () => console.log("count complete"),
    });
  }

  ngOnDestroy(): void {
    this.subscribeReference.unsubscribe();
  }
}
