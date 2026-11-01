// let taskId = 0;

// class Task {
//   constructor(title, priority) {
//     this.id = ++taskId;
//     this.title = title;
//     this.priority = priority;
//     this.status = "pending";
//   }

//   validTask() {
//     return this.title.trim() === "";
//   }
// }

// const tasks = [];

// const workFlowArray = [];

// // let task1= new Task("T-101","Build Site", "high");
// // let task2= new Task("T-102","test site", "medium");

// // tasks.push(task1);
// // tasks.push(task2);

// // console.log(tasks);

// function addTask(title, priority) {
//   let task = new Task(title, priority);
//   if (task.validTask()) {
//     console.error("Empty task parameter");
//     return;
//   }
//   if (workFlowArray.length >= 3) {
//     console.warn("Workflow array limit reached, only 3 tasks can be added for execution.");
//     return;
//   }
//   tasks.push(task);
//   workFlowArray.push(task);

//   console.log("task Added successfully");
// }

// addTask("Build Application", "high");
// addTask("deploy site", "medium");
// addTask("test site", "low");
// addTask("review site", "low");

// console.log(tasks);

// function displaytasks() {
//   tasks.forEach(task => {
//     console.log(`${task.id}. ${task.title} | ${task.priority} | ${task.status}`)
//   })
// }
// displaytasks();

// function updateStatus(id, newstatus) {
//   let findtask = tasks.find(task => task.id === id);

//   if (!findtask) {
//     console.error("Task not found");
//     return;
//   }
//   findtask.status = newstatus;
// }
// updateStatus(1, "open");
// displaytasks();

// function displayWorkflowtasks() {
//   console.log("Workflow tasks below")
//   workFlowArray.forEach(task => {
//     console.log(`${task.id}. ${task.title} | ${task.priority} | ${task.status}`)
//   })
// }
// displayWorkflowtasks()

// function executeWorkflow(task) {
//   let pr= new Promise((resolve) => {
//     console.log(`Starting workflow of Task: ${task.title}`);

//     setTimeout(() => {
//       console.log(`Completed execution of task: ${task.title}`);
//       resolve();
//     }, 2000);
//   })

//   async function runworkflow() {
//     try{
//       let val = await pr;
//       console.log(val);
//     }
//     catch(err){
//       console.log(err);
//     }
//   }
//   runworkflow();
// }
// executeWorkflow(workFlowArray[0]);

let workflowExecuteBtn = document.querySelector("#executeBtn");

function flowState() {
  let user_title = document.querySelector("#title");
  let user_priority = document.querySelector("#priority");
  let addtaskBtn = document.querySelector("#addTaskBtn");
  let workflowTotaltasksCount = document.querySelector("#totalTasks");

  let taskLists = document.querySelector("#taskList");

  let wStart = document.querySelector("#start");
  let wcompleted = document.querySelector("#complete");

  let taskid = 0;
  let workFlowArray = [];
  let copyArray = [];

  class Task {
    constructor(id, title, priority) {
      this.id = id;
      this.title = title;
      this.priority = priority;
      this.status = "pending";
    }
  }
  // taskLists.innerHTML = " ";
  return {
    addTask: function () {
      addtaskBtn.addEventListener("click", function (prev) {
        prev.preventDefault();

        let user_input_title = user_title.value;
        let user_input_priority = user_priority.value;

        if (user_input_title.trim() === "") {
          alert("Empty Task Field");
          return;
        } else if (user_input_priority === "") {
          alert("Select Any Priority");
          return;
        }
        if (workFlowArray.length === 3) {
          alert("Maximum workflow limit reached, execute to reset.");
          user_title.value = "";
          user_priority.value = "";
          return;
        }
        let task = new Task(++taskid, user_input_title, user_input_priority);

        workFlowArray.push(task);
        alert("Task Added Successfully");

        console.log("task added successfully");

        workflowTotaltasksCount.textContent = `${workFlowArray.length}`;
        workflowTotaltasksCount.style.color = "text-yellow-300";

        console.log(...workFlowArray);

        user_title.value = "";
        user_priority.value = "";
      });
    },
    workflowExecute: async function () {
      if (workFlowArray.length === 0) {
        alert("Add a task before executing.");
        return;
      }
      else if (workFlowArray.length < 3) {
        alert("Not enough task to proceed");
        return;
      }
      for (const task of workFlowArray) {
        wStart.textContent = `Starting Execution of: ${task.title}`;

        const result = await new Promise((resolve) => {
          setTimeout(() => {
            resolve(`Completed execution of: ${task.title}`);
            wcompleted.textContent = `Completed Execution of: ${task.title}`;
            // task.status = "open";
            // console.log(...workFlowArray);
          }, 2000);
        });
        console.log(result);
      }
      alert("Workflow complete");
      return "All Task Complete";
    },
    displaytasks: function () {
      taskLists.innerHTML = " ";
      // copyArray.length=0;
      copyArray.push(...workFlowArray);
      copyArray.forEach(task => {
        const card = document.createElement("div");
        card.className = "bg-amber-400 w-[50%] min-w-0 min-h-[15vh] p-4 space-grotesk rounded-lg shadow-md break-words leading-[4vh]";

        const title = document.createElement("h1");
        title.className = "font-bold";
        title.textContent = `Title: ${task.title}`;

        const priority = document.createElement("h1");
        priority.textContent = `Priority: ${task.priority}`;

        const status = document.createElement("h1");
        status.textContent = `Status: ${task.status}`;

        card.append(title, priority, status);
        taskLists.append(card);

        if (task.priority === "High") {
          card.style.backgroundColor = "red";
          card.style.color = "white";
        }
        else if (task.priority === "Medium") {
          card.style.backgroundColor = "yellow";
          card.style.color = "black";
        }
        else if (task.priority === "Low") {
          card.style.backgroundColor = "green";
          card.style.color = "white";
        }
        // console.log(task.priority);
      })
      workFlowArray.length = 0;
      workflowTotaltasksCount.textContent = `${workFlowArray.length}`;
      // taskTitle.textContent=`${workFlowArray.title}`;
    },
    dashboardUi: function () {
      document.querySelector("#totalTasksdash").textContent = `${copyArray.length}`;
      let filteredPriority = copyArray.filter(getPriority => {
        return getPriority.priority === "High";
      });
      let priorityCount = filteredPriority.length;
      document.querySelector("#highPriority").textContent = `${priorityCount}`;

      let filteredStatus= copyArray.filter(getStatus =>{
        return getStatus.status=== "pending";
      });
      // console.log(filteredStatus);
      let statusCount = filteredStatus.length;
      document.querySelector("#pendingTasks").textContent= `${statusCount}`;
    }
  };
}
workflowExecuteBtn.addEventListener("click", async function () {
  try {
    const result = await reviewstate.workflowExecute();
    reviewstate.displaytasks();
    reviewstate.dashboardUi();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
});

const reviewstate = flowState();
reviewstate.addTask();
