import { BehaviorSubject, distinctUntilChanged, map, Observable } from 'rxjs';

export class StateService<T> {
  private state$: BehaviorSubject<T>;

  protected get state(): T {
    return this.state$.getValue();
  }

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  protected select<X>(mapFn: (state: T) => X): Observable<X> {
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  protected setState(newState: Partial<T>): void {
    this.state$.next({
      ...this.state,
      ...newState,
    });
  }
}
