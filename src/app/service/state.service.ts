import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { SubjetService } from "./subjet.service";

@Injectable({
  providedIn: "root",
})
export class StateService {
  private state = false;
  private clickCount = 0;

  constructor(private subjetService: SubjetService) {}

  getState(): boolean {
    return this.state;
  }

  getClickCount(): number {
    return this.clickCount;
  }

  private setState(newState: boolean): void {
    this.state = newState;
  }

  stateForecastChannel(newState: boolean): void {
    this.setState(newState);
    this.subjetService.actionEmiter.next(this.state);
  }

  stateSubscriptionChannel(): Subject<boolean> {
    return this.subjetService.actionEmiter;
  }
}
