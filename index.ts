import { fromEvent, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "./user";

let userModel: User = {};

// DOM Elements - declaration
let buttonElement: HTMLButtonElement;
let emailInput: HTMLInputElement;
let passwordInput: HTMLInputElement;

// DOM events as Observables - declaration
let emailChange$: Observable<InputEvent>;
let passwordChange$: Observable<InputEvent>;
let submit$: Observable<MouseEvent>;

// DOM elements - assignation
buttonElement = document.getElementById("submit") as HTMLButtonElement;
emailInput = document.getElementById("email") as HTMLInputElement;
passwordInput = document.getElementById("password") as HTMLInputElement;

// DOM events as Observables - assignation
emailChange$ = fromEvent<InputEvent>(emailInput, "input");
passwordChange$ = fromEvent<InputEvent>(passwordInput, "input");
submit$ = fromEvent<MouseEvent>(buttonElement, "click");

// Subscription processing
emailChange$.pipe(getValueFromInputEvent).subscribe(email => {
  console.log("email Value: ", email);
  userModel.email = email;
});

passwordChange$
  .pipe(map((event: InputEvent) => (event.target as HTMLInputElement).value))
  .subscribe(password => {
    console.log("password Value:", password);
    userModel.password = password;
  });

submit$
  .pipe(tap((event: MouseEvent) => console.log(event)))
  .subscribe(() => console.log("Sending User", { userModel }));

function getValueFromInputEvent(
  event: Observable<InputEvent>
): Observable<string> {
  return event.pipe(
    // tap(event => console.log("event.target", event.target)),
    map((event: InputEvent) => (event.target as HTMLInputElement).value)
  );
}
