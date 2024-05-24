import React, { useEffect, useState } from "react";
import {
  TextField,
  TextArea,
  Button,
  Flex,
  Text,
  DropdownMenu,
  Table,
} from "@radix-ui/themes";
import { getAllItems } from "../../services/serviceRoutes/itemServices";
import RiddleItemList from "./RiddleItemList";
import RiddleItemSelection from "./RiddleItemSelection";
import CreateHuntInputs from "./CreateHuntInputs";
import SubmitHuntBtn from "./SubmitHuntBtn";
import { createHuntTemplate } from "../../services/serviceRoutes/huntTemplateServices";
import { createRiddleItemByTemplate } from "../../services/serviceRoutes/riddleItemServices";
import { useNavigate } from "react-router";

const CreateHuntTemplate = () => {
  const [selection, setSelection] = useState({
    category: "",
    item: "",
    item_id: 0,
    riddle: "",
  });
  const [huntName, setHuntName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [categories, setCategories] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [isTempCreated, setIsTempCreated] = useState(false);
  const [newHuntId, setNewHuntId] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    // TODO: connect to fetch all items
    const fetchAllItems = async () => {
      const response = await getAllItems();
      if (response.status === 200) {
        setItems(response.data);
        console.log(response.data);
        const categoriesList = [];
        response.data.map((item) => {
          if (!categoriesList.includes(item.category)) {
            categoriesList.push(item.category);
          }
        });
        // console.log(categoriesList)
        setCategories(categoriesList);
      }
    };
    fetchAllItems();
  }, []);

  const addCategoryItemPair = () => {
    setSavedItems([...savedItems, selection]);
    setSelection({...selection, riddle: ""})
  };

  const deleteItemPair = (idx) => {
    const updatedList = savedItems.filter((item, index) => {
      return index !== idx;
    });
    setSavedItems(updatedList);
  };

  const filterItems = (newCat) => {
    const filtered = items.filter((item) => {
      // console.log(selection.category)
      return item.category === newCat;
    });
    setFilteredItems(filtered);
    console.log(filtered);
  };

  const handleCategoryChange = (value) => {
    const newSelection = { ...selection, category: value };
    setSelection(newSelection);
    console.log(newSelection);
    filterItems(value);
  };

  const handleItemChange = (name, id) => {
    const newSelection = { ...selection, item: name, item_id: id };
    setSelection(newSelection);
  };

  const handleRiddleChange = (value) => {
    const newSelection = { ...selection, riddle: value };
    setSelection(newSelection);
  };

  const createHunt = async () => {
    // TODO: Create Hunt API
    try {
      const response = await createHuntTemplate({name: huntName, description: description, location: location, difficulty: "E"})
      console.log(response)
      if (response.status === 201) {
        const huntTemplateId = response.data.id
        setNewHuntId(huntTemplateId)
        setIsTempCreated(true)
      }
    } catch (error) {
      console.error(error)
    }
    // console.log("Creating hunt", { huntName, description, categories });
  };

  const saveAndExit = async() => {
    const updatedPayload = []
    savedItems.forEach(item => {
      updatedPayload.push({item_id: item.item_id, riddle: item.riddle })
    })
    try {
      const response = await createRiddleItemByTemplate(newHuntId, updatedPayload)
      console.log(response)
      if (response.status === 201) {
        navigate(`/creator-control-panel`)
        console.log("riddle items sent and saved!")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex
      direction="column"
      align="center"
      gap="20px"
      style={{ padding: "20px" }}
    >
      {!isTempCreated ? (
        <Text as="h1" size="6" weight="bold" color="indigo" variant="soft">
          Create a Scavenger Hunt
        </Text>
      ) : (
        <>
          <Text as="h1" size="6" weight="bold" color="indigo" variant="soft">
            Add Riddle Items
          </Text>
          <RiddleItemList
            savedItems={savedItems}
            deleteItemPair={deleteItemPair}
          />
        </>
      )}
      {!isTempCreated ? (
        <CreateHuntInputs
          huntName={huntName}
          setHuntName={setHuntName}
          description={description}
          setDescription={setDescription}
          location={location}
          setLocation={setLocation}
        />
      ) : (
        <RiddleItemSelection
          selection={selection}
          categories={categories}
          filteredItems={filteredItems}
          handleCategoryChange={handleCategoryChange}
          handleItemChange={handleItemChange}
          handleRiddleChange={handleRiddleChange}
          addCategoryItemPair={addCategoryItemPair}
        />
      )}
      <SubmitHuntBtn createHunt={createHunt} saveAndExit={saveAndExit} isTempCreated={isTempCreated} />
    </Flex>
  );
};

export default CreateHuntTemplate;
