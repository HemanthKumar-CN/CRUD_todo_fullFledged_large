import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import TaskCard from "../Components/TaskCard";
import { getTasks } from "../Redux/AppReducer/action";

const Home = () => {
  const { tasks } = useSelector((state) => state.AppReducer);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const getTasksHandler = useCallback(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(() => {
    if (tasks.length === 0) {
      getTasksHandler();
    }
  }, [getTasksHandler, tasks.length]);

  // console.log(tasks);

  const fiterByParamTags = (task) => {
    const paramTags = searchParams.getAll("tags");

    if (paramTags.includes("All") || paramTags.length == 0) {
      return task;
    }

    const data = task.tags.filter((tag) => {
      if (paramTags.includes(tag)) {
        return true;
      } else {
        return false;
      }
    });

    if (data.length) {
      return task;
    } else {
      return false;
    }

    // console.log(data);
  };

  return (
    <Box width={"100%"}>
      <Flex justifyContent={"space-around"}>
        <Box border={"1px solid black"} width="12rem" height="99vh">
          <Box>
            <Text
              bg={"red.200"}
              padding={"1.5"}
              fontWeight={"bold"}
              textAlign={"center"}
            >
              TODO
            </Text>
          </Box>
          {tasks.length &&
            tasks
              .filter((item) => item.task_Status == "todo")
              .filter(fiterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} />;
              })}
        </Box>
        <Box border={"1px solid black"} width="12rem" height="99vh">
          <Box>
            <Text
              textAlign={"center"}
              bg="gray.200"
              padding={"1.5"}
              fontWeight={"bold"}
            >
              IN-PROGRESS
            </Text>
          </Box>
          {tasks.length &&
            tasks
              .filter((item) => item.task_Status == "in-progress")
              .filter(fiterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} />;
              })}
        </Box>
        <Box border={"1px solid black"} width="12rem" height="99vh">
          <Box>
            <Text
              bg={"green.200"}
              padding={"1.5"}
              textAlign={"center"}
              fontWeight={"bold"}
            >
              DONE
            </Text>
          </Box>
          {tasks.length &&
            tasks
              .filter((item) => item.task_Status == "done")
              .filter(fiterByParamTags)
              .map((item) => {
                return <TaskCard key={item.id} {...item} />;
              })}
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
