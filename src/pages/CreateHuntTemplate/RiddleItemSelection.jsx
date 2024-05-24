import React from "react";
import { Flex, DropdownMenu, Button, TextArea } from "@radix-ui/themes";

const RiddleItemSelection = ({
  categories,
  selection,
  filteredItems,
  handleCategoryChange,
  handleItemChange,
  handleRiddleChange,
  addCategoryItemPair,
}) => {
  return (
    <>
      <Flex
        direction="column"
        gap="10px"
        align="center"
        style={{ width: "100%", maxWidth: "500px", padding: "10px" }}
      >
        <Flex
          direction="row"
          gap="10px"
          align="center"
          style={{ justifyContent: "space-between", whiteSpace: "nowrap" }}
        >
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="surface" style={{ width: "130px" }}>
                {selection?.category || "Select Category"}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {categories.map((category, idx) => (
                <DropdownMenu.Item
                  key={idx}
                  onSelect={() => handleCategoryChange(category)}
                >
                  {category}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="surface" style={{ width: "130px" }}>
                {selection.item || "Select Item"}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {filteredItems.map((item, idx) => (
                <DropdownMenu.Item
                  key={idx}
                  onSelect={() => handleItemChange(item.name, item.id)}
                >
                  {item.name}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        <TextArea
          type="text"
          placeholder="Riddle"
          value={selection.riddle}
          onChange={(e) => handleRiddleChange(e.target.value)}
          style={{ width: "300px", height: "50px" }}
        />
      </Flex>

      <Button
        onClick={addCategoryItemPair}
        variant="soft"
        style={{
          width: "100%",
          maxWidth: "500px",
          cursor: "default",
          transition: "none",
        }}
      >
        Add Category & Item
      </Button>
    </>
  );
};

export default RiddleItemSelection;
