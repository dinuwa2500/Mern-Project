const ItemCard = ({ item, imageSize }) => {
  return (
    <div className="item-card">
      <img 
        src={item.image} 
        alt={item.name} 
        style={{ width: imageSize, height: imageSize, objectFit: 'cover' }}  // Apply fixed size passed as prop
      />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
    </div>
  );
};

export default ItemCard;
