export default function addItem(newItem, setItems) {
  setItems((prevItems) => [...prevItems, newItem]);
};