import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";
import { StateService } from "../service/state.service";
@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  isActiveState = false;
  private subscribeStateReference!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private stateService: StateService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });

    this.isActiveState = this.stateService.getState();
    this.subscribeStateReference = this.stateService
      .stateSubscriptionChannel()
      .subscribe((state) => {
        this.isActiveState = state;
      });
  }

  ngOnDestroy(): void {
    this.subscribeStateReference.unsubscribe();
  }

  onUserButtonClick() {
    this.stateService.stateForecastChannel(!this.isActiveState);
  }
}
