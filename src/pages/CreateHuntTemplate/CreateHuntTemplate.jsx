import React, { useState } from 'react';
import { Box, Button, Flex, Text, DropdownMenu } from '@radix-ui/themes';

const CreateHuntTemplate = () => {
  const [categories, setCategories] = useState([{ category: '', item: '', riddle: '' }]);
  const [huntName, setHuntName] = useState('');
  const [description, setDescription] = useState('');

  const addCategoryItemPair = () => {
    setCategories([...categories, { category: '', item: '', riddle: '' }]);
  };

  const handleCategoryChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].category = value;
    setCategories(newCategories);
  };

  const handleItemChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].item = value;
    setCategories(newCategories);
  };

  const handleRiddleChange = (index, value) => {
    const newCategories = [...categories];
    newCategories[index].riddle = value;
    setCategories(newCategories);
  };

  const saveHunt = () => {
    // Logic to save the scavenger hunt
    console.log('Saving hunt', { huntName, description, categories });
  };

  return (
    <Flex direction="column" align="center" gap="20px" style={{ padding: '20px' }}>
      <Text as="h1" size="6" weight="bold" color="indigo" variant="soft">
        Create a Scavenger Hunt
      </Text>
      <input
        type="text"
        placeholder="Name"
        value={huntName}
        onChange={(e) => setHuntName(e.target.value)}
        style={{ width: '100%', maxWidth: '500px', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ width: '100%', maxWidth: '500px', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      {categories.map((catItem, index) => (
        <Flex key={index} direction="column" gap="10px" style={{ width: '100%', maxWidth: '500px', padding: '10px' }}>
          <Flex direction="row" gap="10px" align="center" style={{ justifyContent: 'space-between' }}>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="surface" style={{ width: '48%' }}>
                  {catItem.category || 'Select Category'}
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                {['Category1', 'Category2', 'Category3'].map((category, catIndex) => (
                  <DropdownMenu.Item key={catIndex} onSelect={() => handleCategoryChange(index, category)}>
                    {category}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="surface" style={{ width: '48%' }}>
                  {catItem.item || 'Select Item'}
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                {['Item1', 'Item2', 'Item3'].map((item, itemIndex) => (
                  <DropdownMenu.Item key={itemIndex} onSelect={() => handleItemChange(index, item)}>
                    {item}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
          <input
            type="text"
            placeholder="Riddle"
            value={catItem.riddle}
            onChange={(e) => handleRiddleChange(index, e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </Flex>
      ))}
      <Button onClick={addCategoryItemPair} variant="soft" style={{ width: '100%', maxWidth: '500px', cursor: 'default', transition: 'none' }}>
        Add Category & Item
      </Button>
      <Button 
        onClick={saveHunt} 
        variant="surface" 
        style={{ 
          width: '100%', 
          maxWidth: '500px', 
          transition: 'transform 0.2s, background-color 0.2s', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' 
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.backgroundColor = '#4B0082'; // example color, adjust to your theme
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.backgroundColor = ''; // reset to default
        }}
      >
        Create Scavenger Hunt
      </Button>
    </Flex>
  );
};

export default CreateHuntTemplate;
