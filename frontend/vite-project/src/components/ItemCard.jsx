const ItemCard = ({ item, imageSize }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', textAlign: 'center', marginBottom: '10px' }}>
      <img 
        src={item.image} 
        alt={item.name} 
        style={{ width: imageSize, height: imageSize, objectFit: 'cover' }}  
      />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p style={{ fontWeight: 'bold' }}>Price: ${item.price}</p>
    </div>
  );
};

export default ItemCard;
