import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Editable,
  EditablePreview,
  EditableTextarea,
  Flex,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addSubTasks,
  deleteSubtasks,
  getTasks,
  updateTasks,
} from "../Redux/AppReducer/action";

const EditPage = () => {
  const { id } = useParams();

  const { tasks } = useSelector((state) => state.AppReducer);
  const dispatch = useDispatch();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskTags, setTaskTags] = useState([]);
  const [currentSubTask, setCurrentSubTask] = useState("");
  const [subTasks, setSubTasks] = useState([]);
  const [checkBox, setCheckBox] = useState([]);

  const addSubTask = (e) => {
    e.preventDefault();
    if (currentSubTask) {
      const newSubTask = [
        ...subTasks,
        { subTaskTitle: currentSubTask, status: false },
      ];

      dispatch(addSubTasks(id, { subTasks: newSubTask }))
        .then(() => dispatch(getTasks()))
        .then(() => {
          setCurrentSubTask("");
        });
    }
  };

  useEffect(() => {
    if (tasks.length == 0) {
      dispatch(getTasks());
    }

    return () => {};
  }, [dispatch, tasks.length]);

  useEffect(() => {
    if (tasks) {
      const currentTask = tasks.find((item) => item.id === Number(id));

      if (currentTask) {
        setTaskTitle(currentTask.title);
        setTaskDescription(currentTask.description);
        setTaskStatus(currentTask.task_Status);
        setTaskTags(currentTask.tags);
        setSubTasks(currentTask.subTasks);

        let data = currentTask.subTasks
          .filter((item) => {
            return item.status && item.subTaskTitle;
          })
          .map((item) => item.subTaskTitle);
        setCheckBox(data);
      }
    }

    return () => {};
  }, [id, tasks]);

  const updateHandler = (type, value) => {
    if (type === "textAndDescription") {
      dispatch(
        updateTasks(id, {
          title: taskTitle,
          description: taskDescription,
        })
      ).then((r) => dispatch(getTasks()));
    } else if (type === "taskStatus") {
      dispatch(
        updateTasks(id, {
          task_Status: value,
        })
      ).then(() => dispatch(getTasks()));
    } else if (type === "taskTags") {
      dispatch(
        updateTasks(id, {
          tags: value,
        })
      ).then(() => dispatch(getTasks()));
    }
  };

  const updatesubtaskStatus = (checkBoxValues) => {
    let newData = subTasks.map((item) => {
      if (checkBoxValues.includes(item.subTaskTitle)) {
        return {
          ...item,
          status: true,
        };
      }

      return { ...item, status: false };
    });

    dispatch(addSubTasks(id, { subTasks: newData })).then(() =>
      dispatch(getTasks())
    );
  };

  const handleDelete = (title) => {
    let newData = subTasks.filter((item) => item.subTaskTitle !== title);

    dispatch(deleteSubtasks(id, { subTasks: newData })).then(() =>
      dispatch(getTasks())
    );
  };

  return (
    <Box border={"1px solid green"} width={"100%"} height={"100vh"}>
      <Flex justifyContent={"space-around"} mt="3vh">
        <Box border={"1px solid red"} width={"150px"} height={"95vh"}>
          <VStack>
            <Input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              placeholder={"title"}
            />
            <Editable value={taskDescription}>
              <EditablePreview />
              <EditableTextarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </Editable>
            <Button
              onClick={() => {
                updateHandler("textAndDescription");
              }}
            >
              Update
            </Button>
          </VStack>
          <Box>
            <RadioGroup
              onChange={(value) => {
                setTaskStatus(value);
                updateHandler("taskStatus", value);
              }}
              value={taskStatus}
            >
              <Stack direction="column">
                <Radio value="todo">Todo</Radio>
                <Radio value="in-progress">In-Progress</Radio>
                <Radio value="done">Done</Radio>
              </Stack>
            </RadioGroup>
          </Box>

          <Box>
            <Text>Tags</Text>
            <CheckboxGroup
              colorScheme="green"
              onChange={(value) => {
                setTaskTags(value);
                updateHandler("taskTags", value);
              }}
              value={taskTags}
            >
              <Stack spacing={[1, 5]} direction={"column"}>
                <Checkbox value="official">official</Checkbox>
                <Checkbox value="Personal">Personal</Checkbox>
                <Checkbox value="others">others</Checkbox>
              </Stack>
            </CheckboxGroup>
          </Box>
        </Box>
        <Box border={"1px solid blue"} width={"200px"} height={"95vh"}>
          <form action="" onSubmit={(e) => addSubTask(e)}>
            <Flex>
              <Input
                placeholder="Add new subTask"
                value={currentSubTask}
                onChange={(e) => setCurrentSubTask(e.target.value)}
              />
              <Button type="submit">Add</Button>
            </Flex>
          </form>
          <Flex direction={"column"} gap={"1rem"}>
            <CheckboxGroup
              value={checkBox}
              onChange={(value) => {
                setCheckBox(value);
                updatesubtaskStatus(value);
              }}
            >
              {subTasks.length &&
                subTasks.map((item, index) => (
                  <Flex
                    key={index}
                    justifyContent={"space-between"}
                    padding={"1"}
                  >
                    <Checkbox
                      value={item.subTaskTitle}
                      bg={"whiteAlpha.800"}
                      key={index}
                    >
                      {item.subTaskTitle}
                    </Checkbox>
                    <DeleteIcon
                      cursor={"pointer"}
                      onClick={() => handleDelete(item.subTaskTitle)}
                    />
                  </Flex>
                ))}
            </CheckboxGroup>
          </Flex>
        </Box>
        <Box border={"1px solid black"} width={"220px"} height={"95vh"}></Box>
      </Flex>
    </Box>
  );
};

export default EditPage;
