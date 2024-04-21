export default function MenuItem({
  itemId,
  itemName,
  itemPrice,
  itemDescription,
}) {
  let menuId = "menu-item-${itemId}";
  return (
    <div class="menu-item" id={menuId}>
      <span>${itemPrice}</span>
      <h2>{itemName}</h2>
      <p> {itemDescription}</p>
      <button>Add to Cart</button>
    </div>
  );
}
