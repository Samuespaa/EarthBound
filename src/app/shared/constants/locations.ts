import { Location } from "../models/location";
import { NPCTranslate } from "../models/npc-translate";
import { Shop } from "../models/shop";
import { ITEMS } from "./items";
import { MUSICS } from "./musics";

export const LOCATIONS = [
  new Location('constants.locations.yourHome.name', 'constants.locations.onett.name', [
    new NPCTranslate('constants.locations.yourHome.npcs.mom.name', 'constants.locations.yourHome.npcs.mom.texts')
  ], [], false, false, MUSICS.homeSweetHome),
  new Location('constants.locations.onett.name', 'constants.locations.twoson.name', [], [
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
  new Location('constants.locations.twoson.name', 'constants.locations.threed.name', [], [], true, true, MUSICS.homeSweetHome),
];