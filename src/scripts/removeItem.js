export default function removeItem(id, setItems) {
  setItems((prevItems) => prevItems.filter((item) => item !== id));
};