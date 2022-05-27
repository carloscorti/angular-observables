import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { StateService } from "./service/state.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  private subscribeStateReference!: Subscription;
  isMessageActive = false;

  constructor(private stateService: StateService) {}

  ngOnInit() {
    this.isMessageActive = this.stateService.getState();
    this.subscribeStateReference = this.stateService
      .stateSubscriptionChannel()
      .subscribe((state) => {
        this.isMessageActive = state;
      });
  }

  ngOnDestroy(): void {
    this.subscribeStateReference.unsubscribe();
  }
}
