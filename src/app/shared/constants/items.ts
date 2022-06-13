import { Item } from "../models/item";

export const ITEMS = {
  bagOfFries: new Item('constants.items.bagOfFries.name', 'heal', 24, 8, -1, 'constants.items.bagOfFries.description'),
  breadRoll: new Item('constants.items.breadRoll.name', 'heal', 30, 12, -1, 'constants.items.breadRoll.description'),
  canOfFruitJuice: new Item('constants.items.canOfFruitJuice.name', 'heal', 6, 4, -1, 'constants.items.canOfFruitJuice.description'),
  cookie: new Item('constants.items.cookie.name', 'heal', 6, 7, -1, 'constants.items.cookie.description'),
  cupOfCoffee: new Item('constants.items.cupOfCoffee.name', 'heal', 12, 6, -1, 'constants.items.cupOfCoffee.description'),
  hamburguer: new Item('constants.items.hamburguer.name', 'heal', 50, 14, -1, 'constants.items.hamburguer.description')
}