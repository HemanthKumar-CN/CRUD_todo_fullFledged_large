import {
  Badge,
  Box,
  Checkbox,
  CheckboxGroup,
  Editable,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const TaskCard = ({
  id,
  title,
  description,
  tags,
  subTasks,
  colorScheme = "blue",
}) => {
  const [checkBox, setCheckBox] = useState(() => {
    let data = subTasks
      .filter((item) => {
        return item.status && item.subTaskTitle;
      })
      .map((item) => item.subTaskTitle);
    return data;
  });
  // console.log(checkBox);
  return (
    <Box bg="yellow.100" marginBottom={"1.5"} padding={"1.5"}>
      <Flex justifyContent={"space-between"}>
        <Text>{title}</Text>
        <Link to={`/task/${id}`}>
          <EditIcon cursor={"pointer"} />
        </Link>
      </Flex>

      <Box>
        <HStack>
          {tags.length &&
            tags.map((item, index) => (
              <Badge key={index} colorScheme={colorScheme}>
                {item}
              </Badge>
            ))}
        </HStack>
      </Box>
      <Text>{description}</Text>
      <Box>
        <CheckboxGroup defaultValue={checkBox}>
          {subTasks.length &&
            subTasks.map((item, index) => (
              <Checkbox
                value={item.subTaskTitle}
                bg={"whiteAlpha.800"}
                key={index}
              >
                {item.subTaskTitle}
              </Checkbox>
            ))}
        </CheckboxGroup>
      </Box>
    </Box>
  );
};

export default TaskCard;
