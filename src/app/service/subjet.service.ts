import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SubjetService {
  actionEmiter = new Subject<boolean>();
}
