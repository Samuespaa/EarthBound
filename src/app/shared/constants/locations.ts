import { Location } from "../models/location";
import { Shop } from "../models/shop";
import { ITEMS } from "./items";
import { MUSICS } from "./musics";

export const LOCATIONS = [
  new Location('constants.locations.yourHome', 'constants.locations.onett', [], false, false, MUSICS.homeSweetHome),
  new Location('constants.locations.onett', 'constants.locations.twoson', [
    new Shop('constants.shops.bakery', [
      ITEMS.cookie,
      ITEMS.breadRoll
    ]),
    new Shop('constants.shops.burguerShop', [
      ITEMS.canOfFruitJuice,
      ITEMS.cupOfCoffee,
      ITEMS.bagOfFries,
      ITEMS.hamburguer
    ])
  ], true, true, MUSICS.homeSweetHome),
  new Location('constants.locations.twoson', 'constants.locations.threed', [], true, true, MUSICS.homeSweetHome),
];