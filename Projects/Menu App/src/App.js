import "./App.css";
//import Menu from "./components/Menu";
import MenuApp from "./components/MenuApp";
// MenuItem from "./components/MenuItem";

let menuData = [
  {
    menuName: "Dinner",
    menuItems: [
      {
        itemId: 1,
        itemPrice: "12",
        itemName: "Lasagne",
        itemDescription:
          "Meat and cheese layered between house-made pasta with bell peppers and onions.",
      },
      {
        itemId: 2,
        itemPrice: "10",
        itemName: "Cheese Ravioli",
        itemDescription: "Cheese-filled ravioli served with house red sauce.",
      },
      {
        itemId: 3,
        itemPrice: "14",
        itemName: "Chicken Parmesan",
        itemDescription:
          "Breaded chicken topped with marinara sauce and lots of cheese served over house made spaghetti.",
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MenuApp data={menuData} />
        {/*<Menu menuName={menu.menuName} menuItems={menu.menuItems} />*/}
        {/*<MenuItem {...menuItem}></MenuItem>*/}
      </header>
    </div>
  );
}

export default App;
