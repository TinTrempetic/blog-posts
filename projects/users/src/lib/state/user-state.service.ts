import { Injectable } from '@angular/core';
import { StateService } from 'projects/shared';
import { User } from 'projects/users';
import { combineLatest, filter, Subject, switchMap, tap } from 'rxjs';
import { UsersHttpService } from '../service/users-http.service';

interface UserState {
  loaded: boolean;
  users: User[];
}

const initialState: UserState = {
  loaded: false,
  users: [],
};

@Injectable({ providedIn: 'root' })
export class UserStateService extends StateService<UserState> {
  loaded$ = this.select((state) => state.loaded);
  users$ = this.select((state) => state.users).pipe(
    tap(() => this._loadUsersAction.next())
  );

  private _loadUsersAction = new Subject<void>();
  loadUsersAction$ = combineLatest([
    this.loaded$,
    this._loadUsersAction.asObservable(),
  ]).pipe(
    filter(([loaded]) => !loaded),
    switchMap(() => {
      return this.service.getUsers();
    }),
    tap((users) => this.usersLoaded(users))
  );

  constructor(private service: UsersHttpService) {
    super(initialState);

    this.loadUsersAction$.subscribe();
  }

  loadUsers(): void {
    this._loadUsersAction.next();
  }

  private usersLoaded(users: User[]): void {
    this.setState({ users, loaded: true });
  }
}
