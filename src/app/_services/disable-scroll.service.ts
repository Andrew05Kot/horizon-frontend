import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class DisableScrollService {
  disableScrollSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  disableScroll() {
    this.disableScrollSubject.next(true);
  }

  enableScroll() {
    this.disableScrollSubject.next(false);
  }
}
