import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInitialTimberState } from "../../types/timbers";
import ITimberList from "../../types/timbers";
import { RootState } from "../../store/store";
const inititalState: IInitialTimberState = {
  loading: "idle",
  timbers: {
    timber: [],
    search: "",
    favorites: [],
    deal: [],
    paid: [],
  },
  selector: "warehouse",
};

const timberSlice = createSlice({
  name: "timbers",
  initialState: inititalState,
  reducers: {
    timberAdd: (state, action: PayloadAction<ITimberList[]>) => {
      state.timbers.timber = action.payload;
    },
    timberSearchByName: (state, action: PayloadAction<string>) => {
      state.timbers.search = action.payload;
    },
    timberSelect: (
      state,
      action: PayloadAction<IInitialTimberState["selector"]>
    ) => {
      state.selector = action.payload;
      state.timbers.search = "";
    },
    timberAddFavorite: (state, action: PayloadAction<number>) => {
      if (state.timbers.favorites.includes(action.payload)) {
        state.timbers.favorites = state.timbers.favorites.filter(
          (id) => id !== action.payload
        );
      } else {
        state.timbers.favorites.push(action.payload);
      }
    },
    timberAddToDeal: (state, action: PayloadAction<number>) => {
      if (
        state.selector === "deal" &&
        state.timbers.deal.includes(action.payload)
      ) {
        state.timbers.paid.push(action.payload);
      } else if (state.timbers.deal.includes(action.payload)) {
        state.timbers.deal = state.timbers.deal.filter(
          (id) => id !== action.payload
        );
      } else {
        state.timbers.deal.push(action.payload);
      }
    },
  },
});

export const filteredTimbers = createSelector(
  [
    (state: RootState) => state.timbers.timbers.timber,
    (state: RootState) => state.timbers.timbers.search,
    (state: RootState) => state.types.type,
    (state: RootState) => state.timbers.selector,
    (state: RootState) => state.timbers.timbers.favorites,
    (state: RootState) => state.timbers.timbers.deal,
    (state: RootState) => state.timbers.timbers.paid,
  ],
  (
    timber,
    search,
    filter: "all types" | "Разовая продажа" | "Аукцион",
    selector,
    favorites,
    deal,
    paid
  ) => {
    timber = timber.filter((timber: ITimberList) => {
      if (search === "") {
        return true;
      }
      return timber.name === search ? true : false;
    });

    const result: ITimberList[] = timber.filter((timber: ITimberList) => {
      if (filter === "all types") {
        return true;
      }
      return timber.type === filter ? true : false;
    });
    switch (selector) {
      case "warehouse":
        return result.filter((timber: ITimberList) => {
          return paid.includes(Number(timber.id)) ? false : true;
        });
      case "favorite":
        return result
          .filter((item: ITimberList) => {
            return favorites.includes(Number(item.id));
          })
          .filter((timber: ITimberList) => {
            return paid.includes(Number(timber.id)) ? false : true;
          });
      case "deal":
        return result.filter((item: ITimberList) => {
          return deal.includes(Number(item.id));
        });
      default:
        return result;
    }
  }
);
const { actions, reducer } = timberSlice;
export default reducer;
export const {
  timberAdd,
  timberSearchByName,
  timberSelect,
  timberAddFavorite,
  timberAddToDeal,
} = actions;
