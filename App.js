import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

// any additional imports
import Task from "./components/Task";

export default function App() {
  // input area
  const [task, setTask] = useState();

  // to store all data
  const [taskItems, setTaskItems] = useState([]);

  // event listener logic for creating a task
  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  };

  // event listener logic for deleting a task
  const completeTask = (index) => {
    let copyItems = [...taskItems];

    // remove the specific task as selected by the user
    copyItems.splice(index, 1);

    // update the original array by rewriting it with the copied array
    setTaskItems(copyItems);
  };

  // another event handler to update task
  // logic will be similar to completeTask()
  // <Modal/>

  return (
    <View style={styles.container}>
      {/* list all the to do containers */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>My To Do Items</Text>
        {/* container for the tasks to be rendered */}
        <View style={styles.items}>
          {/* <Task text={"this is task 1"}></Task> */}
          {taskItems.map((item, index) => {
            return (
              <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                <Task text={item} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* user input for todo tasks */}
      <KeyboardAvoidingView
        // iOS will use padding to avoid keyboard and android will use height
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={"Add your to do item here"}
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
            {/* <Image source={require('./assets/')}></Image> */}
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ED8AED",
    alignItems: "center",
    justifyContent: "center",
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    width: 60,
    backgroundColor: "#fff",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    color: "#1d144a",
  },
});
